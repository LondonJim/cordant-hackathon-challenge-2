class ManagerFinder {

  constructor(client) {
    this.client = client
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.headers = { headers: { "Authorization": "Basic <%= encode(iparam.data.api_key) %>"}}
    this.requester
  }

  execute() {
    let that = this
    this.client.data.get('requester')
        .then(function(data) {
            $('#apptext').text("Ticket created by " + data.requester.name);
            that.client.request.get(that.url, that.headers)
              .then(function(result) {
                console.log(result)
              })
        })
        .catch(function(e) {
            console.log('Exception - ', e);
        });
  }

}
