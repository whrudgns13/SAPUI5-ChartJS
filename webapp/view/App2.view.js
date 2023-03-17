sap.ui.define([
], function(require, factory) {
    'use strict';
    return sap.ui.jsview("es5.view.App2",{
        getControllerName(){
            return "es5.controller.App2";
        },
        createContent(oController){
           const oObjectPage = new sap.uxap.ObjectPageLayout({
            id : this.createId("objectPage"),
            headerContent : new sap.m.VBox({
                items : [
                    new sap.m.Text({text : "Hello OObjectPage"}),
                    new sap.m.Text({text : "Hello OObjectPage"}),
                    new sap.m.Text({text : "Hello OObjectPage"}),
                    new sap.m.Text({text : "Hello OObjectPage"}),
                ]
            }),
            sectionChange : function(oEvent){
                oController.sectionChange(oEvent);
            },
            sections : [
                new sap.uxap.ObjectPageSection({
                    id : this.createId("Product"),
                    title : "Product",
                    subSections : [
                        new sap.uxap.ObjectPageSubSection({
                            blocks : [
                                new sap.m.Table({
                                    id : this.createId("Product__table"),
                                    columns : [
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "ProductID"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "Category"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "Name"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "SupplierID"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "Price"}),
                                        })
                                    ],
                                    items : {
                                        path : "ViewModel>/products",
                                        template : new sap.m.ColumnListItem({
                                            cells : [
                                                new sap.m.Text({
                                                    text : "{ViewModel>ProductID}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>Category}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>Name}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>SupplierID}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>Price}"
                                                }),
                                            ]
                                        })
                                    }
                                })
                            ]
                        })
                    ]
                }),
                new sap.uxap.ObjectPageSection({
                    id : this.createId("BusinessPartner"),
                    title : "BusinessPartner",
                    subSections : [
                        new sap.uxap.ObjectPageSubSection({
                            blocks : [
                                new sap.m.Table({
                                    id : this.createId("BusinessPartner__table"),
                                    columns : [
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "BusinessPartnerID"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "CompanyName"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "EmailAddress"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "FaxNumber"})
                                        }),
                                        new sap.m.Column({
                                            header : new sap.m.Label({text : "PhoneNumber"}),
                                        })
                                    ],
                                    items : {
                                        path : "ViewModel>/partner",
                                        template : new sap.m.ColumnListItem({
                                            cells : [
                                                new sap.m.Text({
                                                    text : "{ViewModel>BusinessPartnerID}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>CompanyName}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>EmailAddress}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>FaxNumber}"
                                                }),
                                                new sap.m.Text({
                                                    text : "{ViewModel>PhoneNumber}"
                                                }),
                                            ]
                                        })
                                    }
                                })
                            ]
                        })
                    ]
                })
            ]
           });
           const oApp = new sap.m.App({
            id : this.createId("app"),
            pages : [oObjectPage]
           })
           return oApp;
        }
    })    
});