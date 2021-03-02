function vecToMatrix(v) {
    let m = [];
    for (let i = 0; i < 3; i++) {
      m.push([]);
    }
    m[0][0] = v.x;
    m[1][0] = v.y;
    m[2][0] = v.z;
    return m;
  }
  
  function vec4ToMatrix(v) {
    let m = vecToMatrix(v);
    m.push([v.w]);
    return m;
  }
  
  let matrixToVec = (m) => createVector(m[0][0], m[1][0], m[2][0]);
  
  function matrixToVec4(m) {
    let r = new P4Vector(m[0][0], m[1][0], m[2][0], 0);
    if (m.length > 3) {
      r.w = m[3][0];
    }
    return r;
  }
  
  
  function matmulvec(a, vec) {
    let m = vecToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec(r);
  }
  
  function matmulvec4(a, vec) {
    let m = vec4ToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec4(r);
  }
  
  function matmul(a, b) {
    if (b instanceof p5.Vector) {
      return matmulvec(a, b);
    }
    if (b instanceof P4Vector) {
      return matmulvec4(a, b);
    }
  
    let colsA = a[0].length;
    let rowsA = a.length;
    let colsB = b[0].length;
    let rowsB = b.length;
  
    if (colsA !== rowsB) {
      console.error('Columns of A must match rows of B');
      return null;
    }
  
    result = [];
    for (let j = 0; j < rowsA; j++) {
      result[j] = [];
      for (let i = 0; i < colsB; i++) {
        let sum = 0;
        for (let n = 0; n < colsA; n++) {
          sum += a[j][n] * b[n][i];
        }
        result[j][i] = sum;
      }
    }
    return result;
  }