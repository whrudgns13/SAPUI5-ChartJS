sap.ui.define(
    ['sap/ui/core/Control'],
    function(Control) {
        return Control.extend("es5.control.CustomControl",{
            //모든 properties와 aggregations에 작성한 속성들은 get/set을 함수를 생성함
            metadata: {
                library : "es5.control",
                properties: {
                    age : {type : "int[]"}
                },
                aggregations: {
                    content: {                                  //new es5.control.CustomControl({
                        type: "sap.ui.core.Control",             //    content : []  Control 타입의 객체만 들어올 수 있음
                    }                                           //})
                    //content : "sap.ui.core.Control"
                }
            },
            renderer: function(oRm,oControl){
                oRm.write("<div");
     
                //id를 넣어줌
                oRm.writeControlData(oControl);
                oRm.write(">");
                oRm.text(oControl.getAge());
                
                //해당 컨트롤에 대한 aggregation의 랜더러를 호출
                $(oControl.getContent()).each(function(){
                    oRm.renderControl(this);
                });
     
                oRm.write("</div>")
            },
 
            onAfterRendering: function() {
                if(sap.ui.core.Control.prototype.onAfterRendering) {
                 sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments);
                }
            },
 
        });
    }
);
