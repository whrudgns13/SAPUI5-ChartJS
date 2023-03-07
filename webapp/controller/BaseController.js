sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/core/UIComponent"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, History, UIComponent, formatter) {
        "use strict";

        return Controller.extend("es5.controller.BaseController", {
            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.core.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
             * Method for navigation to specific view
             * @public
             * @param {string} psTarget Parameter containing the string for the target navigation
             * @param {Object.<string, string>} pmParameters? Parameters for navigation
             * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
            navTo: function (psTarget, pmParameters, pbReplace) {
                this.getRouter().navTo(psTarget, pmParameters, pbReplace);
            },

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            onNavBack: function () {
                const sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo("appHome", {}, true /* no history*/);
                }
            },
            Dateformat : function(dDate){
                return `${dDate.getFullYear()}년 ${dDate.getMonth()+1}월 ${dDate.getDate()}일`
            },
            showModal : function(){
                const modal = document.querySelector(".modal");
                modal.style.display = "flex";
            },
            hideModal : function(){
                const modal = document.querySelector(".modal");
                modal.style.display = "none";
            },
            getODataModel : function(){
                const sUrl = "/sap/opu/odata/IWBEP/GWSAMPLE_BASIC";
                const oDataModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
                oDataModel.attachMetadataFailed(this.metadataFailed,this);
                return oDataModel;
            },
            metadataFailed : function(){
                this.hideModal();
            },
            // getStock : async function(startDate,endDate){
            //     let json = await (await fetch("../key.json")).json();
            //     const sUrl = `${json.url}/getStockPriceInfo?serviceKey=${json.key}&beginBasDt=${startDate}&numOfRows=100&resultType=json`;
            //     let stock = await (await fetch(sUrl)).json();
            //     return stock.response.body.items.item;
            // },
            readOData : function(oModel,sUrl,oParam){
                this.showModal();
                const oPromise = new Promise((resolve,reject)=>{
                    oModel.read(`/${sUrl}`,{
                        ...oParam,
                        success: (oData) => {
                            this.hideModal();
                            resolve(oData.results);
                        },
                        error: (error) => {
                            this.hideModal();
                            reject(error);
                        }
                    })
                });

                return oPromise;
            }
        });
    }
);
