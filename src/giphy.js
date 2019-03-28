export class GiphyGetter{
  getGiphy(image){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${image}&rating=G`;
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
