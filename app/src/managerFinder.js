class ManagerFinder {

  constructor(client) {
    this.client = client
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.headers = { headers: { "Authorization": "Basic <%= encode(iparam.data.api_key) %>"}};
    this.requesterId // client requester id
    this.apiResults // results from requester api
    this.results // stores requester costCentre, brand/dept, email, manager id
  }

  parseRequester() {
    let that = this;
    this.apiResults.requesters.forEach(function(requester) {
      if (requester.id === that.requesterId) {
         that.results = {
                          deptId: requester.department_ids,
                          costCentre: requester.custom_fields.cost_centre,
                          email: requester.primary_email,
                          manager: requester.reporting_manager_id
                        }
      }
    })
  }

  execute() {
    let that = this
    this.client.data.get('requester')
        .then(function(data) {
            that.requesterId = data.requester.id;
            that.client.request.get(that.url, that.headers)
              .then(function(results) {
                that.apiResults = JSON.parse(results.response)
                that.parseRequester()
              });
        })
        .catch(function(e) {
            console.log('Exception - ', e);
        });
  }

}
