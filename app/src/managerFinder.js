class ManagerFinder {

  constructor(client) {
    this.client = client
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.headers = { headers: { "Authorization": "Basic <%= encode(iparam.data.api_key) %>"}};
    this.requesterId // client requester id
    this.results // results from requester api
    this.requester // api requester data
  }

  parseRequester() {
    let that = this;
    this.results.requesters.forEach(function(requester) {
      if (requester.id === that.requesterId) {
        that.requester = requester
        console.log({
          deptId: that.requester.department_ids,
          costCentre: that.requester.custom_fields.cost_centre,
          email: that.requester.primary_email,
          manager: that.requester.reporting_manager_id
        });
      }
    })
  }

  execute() {
    let that = this
    this.client.data.get('requester')
        .then(function(data) {
            // $('#apptext').text("Ticket created by " + data.requester.name);
            that.requesterId = data.requester.id;
            that.client.request.get(that.url, that.headers)
              .then(function(results) {
                that.results = JSON.parse(results.response)
                that.parseRequester()
              });
        })
        .catch(function(e) {
            console.log('Exception - ', e);
        });
  }

}
