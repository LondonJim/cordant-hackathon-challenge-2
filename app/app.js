function runPasswordFinder(requester, cl) {
  managerFinder = new ManagerFinder
  managerFinder.execute(requester, cl)
}

$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
          var client = _client;
          client.events.on('app.activated',
            function() {
              let cl = client
                client.data.get('requester')
                    .then(function(data) {
                        $('#apptext').text("Ticket created by " + data.requester.name);
                        runPasswordFinder(data.requester.id, cl)
                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });
        });
    });
});
