function rgbToHsl(a, b, c) {
  a /= 255, b /= 255, c /= 255;
  var d = Math.max(a, b, c),
    e = Math.min(a, b, c),
    f, g, h = (d + e) / 2;
  if (d == e) f = g = 0;
  else {
    var i = d - e;
    g = h > .5 ? i / (2 - d - e) : i / (d + e);
    switch (d) {
      case a:
        f = (b - c) / i + (b < c ? 6 : 0);
        break;
      case b:
        f = (c - a) / i + 2;
        break;
      case c:
        f = (a - b) / i + 4
    }
    f /= 6
  }
  return [f, g, h]
}

function hslToRgb(a, b, c) {
  var d, e, f;
  if (b == 0) d = e = f = c;
  else {
    function g(a, b, c) {
      return c < 0 && (c += 1), c > 1 && (c -= 1), c < 1 / 6 ? a + (b - a) * 6 * c : c < .5 ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
    }
    var h = c < .5 ? c * (1 + b) : c + b - c * b,
      i = 2 * c - h;
    d = g(i, h, a + 1 / 3), e = g(i, h, a), f = g(i, h, a - 1 / 3)
  }
  return [d * 255, e * 255, f * 255]
}

function rgbToHsv(a, b, c) {
  a /= 255, b /= 255, c /= 255;
  var d = Math.max(a, b, c),
    e = Math.min(a, b, c),
    f, g, h = d,
    i = d - e;
  g = d == 0 ? 0 : i / d;
  if (d == e) f = 0;
  else {
    switch (d) {
      case a:
        f = (b - c) / i + (b < c ? 6 : 0);
        break;
      case b:
        f = (c - a) / i + 2;
        break;
      case c:
        f = (a - b) / i + 4
    }
    f /= 6
  }
  return [f, g, h]
}

function hsvToRgb(a, b, c) {
  var d, e, f, g = Math.floor(a * 6),
    h = a * 6 - g,
    i = c * (1 - b),
    j = c * (1 - h * b),
    k = c * (1 - (1 - h) * b);
  switch (g % 6) {
    case 0:
      d = c, e = k, f = i;
      break;
    case 1:
      d = j, e = c, f = i;
      break;
    case 2:
      d = i, e = c, f = k;
      break;
    case 3:
      d = i, e = j, f = c;
      break;
    case 4:
      d = k, e = i, f = c;
      break;
    case 5:
      d = c, e = i, f = j
  }
  return [d * 255, e * 255, f * 255]
};