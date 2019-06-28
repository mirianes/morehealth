const $ = require('jquery')

module.exports = {
    materializeTabs() {
        var elems = document.querySelectorAll('.tabs')
        elems.forEach(element => {
            M.Tabs.init(element)
        })
    },
    materializeSelect() {
        var elems = document.querySelectorAll('select')
        var instances = M.FormSelect.init(elems, {})
    },
    materializeDropdown() {
        var elems = document.querySelectorAll('.dropdown-trigger')
        var instances = M.Dropdown.init(elems, {constrainWidth: false, coverTrigger: false})
    },
    materializeFloating() {
        var elems = document.querySelectorAll('.fixed-action-btn')
        var instances = M.FloatingActionButton.init(elems, {})
    },
    materializeModal() {
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems, {})
    },
    materializeModalClose() {
        var elems = document.querySelectorAll('.modal')
        elems.forEach(element => {
            var instance = M.Modal.getInstance(element)
            if (instance.isOpen) {
                instance.close()
            }
        })
    },
    materializeTextFields() {
        M.updateTextFields();
    },
    materializeCollapsible() {
        var elems = document.querySelectorAll('.collapsible')
        var instances = M.Collapsible.init(elems, {})
    }
}