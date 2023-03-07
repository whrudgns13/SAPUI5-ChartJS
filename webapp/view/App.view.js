sap.ui.jsview("es5.view.App",{
    getControllerName : function(){
        return "es5.controller.App"
    },
    createContent : function(oController){
        const oPage = new sap.f.DynamicPage({
            title : new sap.f.DynamicPageTitle({
                heading : new sap.m.Title({
                    text : "Product Service",                            
                })
            }),
            header: new sap.f.DynamicPageHeader({
                content : [
                   new sap.ui.layout.cssgrid.CSSGrid({
                        gridTemplateColumns : "repeat(5, 1fr)",
                        gridTemplateRows : "repeat(1, 5rem)",
                        gridGap : "2rem",
                        items : [
                            new sap.m.HBox({
                                alignItems : "Center",
                                items : [
                                    new sap.m.Label({ text : "ID"}).addStyleClass("sapUiSmallMarginEnd"),
                                    new sap.m.Input({
                                        placeholder :"ID",
                                        value : "{ViewModel>/searchCondition/ProductID}",
                                        width : "15rem"
                                    })
                                ],
                                
                            }),
                            new sap.m.HBox({
                                alignItems : "Center",
                                items : [
                                    new sap.m.Label({ text : "Category"}).addStyleClass("sapUiSmallMarginEnd"),
                                    new sap.m.ComboBox({
                                        placeholder :"Category",
                                        selectedKey : "{ViewModel>/searchCondition/Category}",
                                        width : "15rem",
                                        items : {
                                            path : "ViewModel>/categorys",
                                            template : new sap.ui.core.ListItem({
                                                key : "{ViewModel>key}",
                                                text : "{ViewModel>text}",
                                            })
                                        }
                                    })
                                ],
                            }),
                            new sap.m.HBox({
                                alignItems : "Center",
                                items : [
                                    new sap.m.Label({ text : "Price"}).addStyleClass("sapUiSmallMarginEnd"),
                                    new sap.m.Input({
                                        placeholder :"Price",
                                        value : "{ViewModel>/searchCondition/Price}",
                                        width : "15rem"
                                    })
                                ]
                                // layoutData : new sap.ui.layout.cssgrid.GridItemLayoutData({
                                //     gridColumn : "span 2"
                                // })
                            }),
                            new sap.m.FlexBox({
                                alignItems : "Center",
                                justifyContent : "End",
                                items : [
                                    new sap.m.Button({
                                        type : "Emphasized",
                                        text : "검색",
                                        width : "4rem",
                                        press : function(){
                                            oController.onSearch();
                                        }
                                    })
                                ]
                            }),
                            
                        ]
                   }) 
                ]
            }),
            content: [
                (function(){
                    const oTable = new sap.m.Table({
                        itemPress : function(oEvent){
                            oController.onRowPress(oEvent);
                        },
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
                            }),                            
                        ],
                    });
                    
                    oTable.bindItems({
                        path : "ViewModel>/products",
                        template :  new sap.m.ColumnListItem({
                            type : "Active",
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
                                    text : "{ViewModel>Price} {ViewModel>CurrencyCode}"
                                }),
                            ]
                        })
                    });
                    this._oTable = oTable;
                    return oTable;
                })()
                
            ],
        });
        const oApp = new sap.m.App(this.createId("app"),{
            pages : oPage
        });
        return oApp;
    }
})