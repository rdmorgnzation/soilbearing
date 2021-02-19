function interpolate(x1,x2,r){
  return x1*(1-r)+x2*r;
}

function getBC(lat, lon, depth, data, methodid){
  let points = data.results;
  if(depth<0){
    return ({
      success: false,
      message: "Depth cannot be -ve",
    });
  }
  let no_int = 10;// 10 nearest point
  // So need min 10 point in table
  // First get nearest 3 points
  let nearest = Array(no_int).fill(null);// small to larger
  let dis = Array(no_int).fill(1000000);
  for(let i in points){
    let a = points[i].lat-lat;
    let b = points[i].long-lon;
    let dist = a*a+b*b;
    for(let j =0;j<no_int;j++){
      if(dist<dis[j]){
        for(let k=no_int-1;k>=j;k--){
          dis[k+1]=dis[k];
          nearest[k+1]=nearest[k];
        }
        dis[j]=dist;
        nearest[j]=points[i];
        break;
      }
    }
  }
  //Check if nearest point is within 1deg
  if (dis[0]>1.){
    return ({
      success: false,
      message: "No datas found near the point",
    });
  }
  // Check depth ids
  let depths = Object.keys(points[0].datas);
  let mid;// index of lower depth
  for (mid=0;depths[mid]<depth;mid++);
  if(mid>0)mid--;
  if(!methodid){
    let n = data.methods.length;
    methodid=[...Array(n).keys()];
  }
  let m1=depths[mid+1];
  let m0=depths[mid];
  let r = (depth-m0)/(m1-m0);
  let out = {};
  console.log(methodid);
  for (let c in methodid) {
    let d = methodid[c];
    let p=[];//If dist 0 no IDW
    p[0] = interpolate(nearest[0].datas[m0][d], nearest[0].datas[m1][d], r);
    if (dis[0]<=1e-6){
      out[data.methods[d]]=p[0];
      break;
    };// distance 0 no interpolaion*/
    for (let i =1;i<no_int;i++){
      p[i]=interpolate(nearest[i].datas[m0][d], nearest[i].datas[m1][d], r);
    }
    // Apply IDW
    let u=0.,ds=0.;
    for(let i in p){
      u+=p[i]/Math.sqrt(dis[i]);
      ds+=1/Math.sqrt(dis[i]);
    }
    out[data.methods[d]]=u/ds;
  };
  return ({
    success: true,
    message: out,
  });
};

export default getBC;
