
function runPasswordFinder(client) {
  managerFinder = new ManagerFinder(client)
  managerFinder.execute()
}

$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
          let client = _client;
          client.events.on('app.activated',
            function() {
              runPasswordFinder(client)
            
        });
    });
});
