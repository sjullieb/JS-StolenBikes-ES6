export class BikeService{
  getBikeInfo(color, location, distance){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v3/search/count?query=${color}&location=${location}&distance=${distance}&stolenness=stolen`;
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response);
        }
        else{
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
