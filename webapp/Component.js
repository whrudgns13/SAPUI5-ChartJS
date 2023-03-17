/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "es5/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("es5.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                // jQuery.sap.registerModulePath("","./es5/control/CustomControl");
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.createModal();
            },
            createModal : function(){
                let modal = document.createElement("div");
                modal.className = "modal";
                modal.style.display = "none";
                modal.innerHTML = `<div class="modal--container">
                    <div class="classic-2">
                        Loading...
                    </div>
                </div>`;
                document.body.before(modal);
            }
        });
    }
);