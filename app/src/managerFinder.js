class ManagerFinder {

  constructor(client) {
    this.client = client
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.headers = { "headers": { "x-auth-token": "<%= data.token %>"}}
    this.requester
  }

  execute() {
    let that = this
    this.client.data.get('requester')
        .then(function(data) {
            $('#apptext').text("Ticket created by " + data.requester.name);
            let outcome = that.client.request.get(that.url, that.headers)
        })
        .catch(function(e) {
            console.log('Exception - ', e);
        });
  }
}
