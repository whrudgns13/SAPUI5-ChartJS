sap.ui.define([
    "./BaseController",
], function (Controller) {
    "use strict";

    return Controller.extend("es5.controller.App", {
        onInit: function () {
            const oView = this.getView();
            const oViewModel = new sap.ui.model.json.JSONModel({
                searchCondition: {
                    Price: "",
                    ProductID: "",
                    Category: "",
                }
            });
            oView.setModel(oViewModel, "ViewModel");
            this.oViewModel = oView.getModel("ViewModel");
           
            this.oDataModel = this.getODataModel();            
            
            this.getCategory();
        },
        
        getCategory: function () {
            this.readOData(this.oDataModel,"ProductSet")
            .then(products=>{
                let aCategorys = [... new Set(products.map(product => product.Category))].map(category => {
                    return { key: category, text: category };
                });
                this.oViewModel.setProperty("/categorys", aCategorys);
            }).catch(error=>{
                new sap.m.MessageToast.show(error);
            });
            
        },
        onSearch: function () {
            const filters = [];
            const oSearchCondition = this.oViewModel.getProperty("/searchCondition");

            for (let [key, value] of Object.entries(oSearchCondition)) {
                if (value) {
                    const sOperator = key === "Price" ? "LE" : "Contains";
                    filters.push(new sap.ui.model.Filter(key, sOperator, value));
                }
            }
            
            this.readOData(this.oDataModel,"ProductSet",{filters})
            .then(products=>{
                this.oViewModel.setProperty("/products", products);
            }).catch(error=>{
                new sap.m.MessageToast.show(error);
            });

            // this.oDataModel.read("/ProductSet", {
            //     filters: aFilters,
            //     success: (products) => {
            //         this.oViewModel.setProperty("/products", products.results);
            //         this.hideModal();
            //     },
            //     error: (error) => {
            //         console.log(error);
            //     }
            // });
        },
        onRowPress : function(oEvent){
            const sPath = oEvent.getParameter("listItem").getBindingContext("ViewModel").getPath();
            const sProductId = this.oViewModel.getProperty(sPath+"/ProductID");
            this.navTo("salesOrderItems",{
                productId : sProductId
            })
        }
    });
});
