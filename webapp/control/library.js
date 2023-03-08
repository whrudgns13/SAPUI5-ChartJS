sap.ui.define([
], function() {
    'use strict';
    return sap.ui.getCore().initLibrary({
        name : "es5.control",
        controls : [
            "es5.control.ChartJS",
            "es5.control.CustomControl",
        ]
    })
});