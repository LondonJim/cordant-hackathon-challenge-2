class Display {

  static view(results) {
    document.getElementById("manager").value = results.manager
    document.getElementById("deptId").value = results.deptId
    document.getElementById("email").innerHTML = results.email
    document.getElementById("costCentre").value = results.costCentre
  }

}
