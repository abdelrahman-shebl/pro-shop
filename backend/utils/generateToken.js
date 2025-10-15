import jwt from 'jsonwebtoken';

// Normalize boolean-like env values
const parseBool = (v) => {
  if (v === undefined || v === null) return undefined;
  const s = String(v).toLowerCase().trim();
  if (s === 'true' || s === '1' || s === 'yes') return true;
  if (s === 'false' || s === '0' || s === 'no') return false;
  return undefined;
};

// Helper to decide whether the cookie should be marked secure.
// Behavior: honor an explicit env override (COOKIE_SECURE). Otherwise decide based on
// the incoming request's protocol (req.secure or x-forwarded-proto). We do NOT
// assume production => secure by default so the cookie will work in local k8s
// NodePort setups without TLS unless the ingress/proxy indicates HTTPS.
const isCookieSecure = (res) => {
  // Explicit override via env var (useful for local k8s testing)
  const envOverride = parseBool(process.env.COOKIE_SECURE);
  if (envOverride === true) return true;
  if (envOverride === false) return false;

  // If there's a request object, use it to detect whether the incoming
  // connection is secure. This covers direct TLS (req.secure) and proxies
  // that set X-Forwarded-Proto when trust proxy is enabled.
  const req = res && res.req;
  if (req) {
    if (req.secure) return true;
    const proto = req.headers && (req.headers['x-forwarded-proto'] || req.headers['X-Forwarded-Proto']);
    if (proto) return proto.split(',')[0].toLowerCase() === 'https';
  }

  // Default: not secure. This makes the cookie usable on plain HTTP local set-ups
  // (NodePort/Minikube) without explicit env vars. In production with TLS the
  // proxy/ingress should set X-Forwarded-Proto or req.secure will be true.
  return false;
};

// Normalize sameSite value to one of: 'lax' | 'strict' | 'none'
const normalizeSameSite = (v) => {
  if (!v) return 'lax';
  const s = String(v).toLowerCase().trim();
  if (s === 'lax' || s === 'strict' || s === 'none') return s;
  // fall back to lax for safety
  return 'lax';
};

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // sameSite policy: default to 'lax' but allow override via env var
  let sameSite = normalizeSameSite(process.env.COOKIE_SAMESITE || process.env.COOKIE_SAME_SITE);

  // Decide secure flag using env override, NODE_ENV and request headers
  let secure = isCookieSecure(res);

  // Browsers require SameSite=None cookies to be Secure. If user requested 'None' but
  // secure is false, we fall back to 'lax' to avoid cookie rejection in browsers.
  if (sameSite === 'none' && !secure) {
    // If the operator explicitly forces SameSite=None even on insecure transport
    // by setting FORCE_SAMESITE_NONE=true, then we allow it (not recommended).
    const forceNone = parseBool(process.env.FORCE_SAMESITE_NONE) === true;
    if (forceNone) {
      // make sure cookie is still marked secure when forcing None
      secure = true;
      // warn in logs so it's visible
      // eslint-disable-next-line no-console
      console.warn('FORCING SameSite=None and Secure for jwt cookie (FORCE_SAMESITE_NONE=true)');
    } else {
      // downgrade to lax to be safe
      sameSite = 'lax';
      // eslint-disable-next-line no-console
      console.warn('Requested SameSite=None but transport is not secure; downgrading to SameSite=Lax');
    }
  }

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure,
    sameSite,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
