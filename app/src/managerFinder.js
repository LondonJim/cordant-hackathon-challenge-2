class ManagerFinder {

  constructor(requesterId) {
    this.requester = requester
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.token = "<%= data.token %>"
  }

  execute() {
    request.post(this.url, this.token)
    console.log(this.token)
  }
}
