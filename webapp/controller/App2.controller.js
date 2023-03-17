sap.ui.define([
    "./BaseController",
], function (Controller) {
    "use strict";

    return Controller.extend("es5.controller.App2", {
        onInit: function () {
            this.getRouter().attachRoutePatternMatched(this.patternMatched,this);
            const oView = this.getView();
            const _self = this;
            const oViewModel = new sap.ui.model.json.JSONModel({});
            oView.setModel(oViewModel,"ViewModel");
            this.oViewModel = oView.getModel("ViewModel");
            this.bCheck = false;
            const sUrl = "/sap/opu/odata/IWBEP/GWSAMPLE_BASIC";
            const oDataModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
            oDataModel.read("/ProductSet",{
                success : (aProducts) => {
                    this.oViewModel.setProperty("/products",aProducts.results);
                }
            });
            oDataModel.read("/BusinessPartnerSet",{
                success : (aBusinessPartners) => {
                    this.oViewModel.setProperty("/partner",aBusinessPartners.results);
                }
            });
        },     
        patternMatched : function(oEvent){
            const sSectionId = oEvent.getParameter("arguments").sectionId;
            const oView = this.getView();
            const oObjectPage = oView.byId("objectPage");
            const oSection = oView.byId(sSectionId);
            const oTable = oView.byId(sSectionId+"__table");
           
            oTable.attachUpdateFinished(function(){
                this.getItems().length && oObjectPage.setSelectedSection(oSection);
            })
        },
        sectionChange : function(oEvent){
            if(!this.bCheck){
                this.bCheck = true;
                return;
            } 
            const oSection = oEvent.getParameter("section");
            const sSectionTitle = oSection.getTitle();
            const aHash = window.location.hash.split("/");
            if(aHash[aHash.length-1]!=="main") aHash.pop();
            aHash.push(sSectionTitle);
            window.location.hash=aHash.join("/");
        }
    });
});
