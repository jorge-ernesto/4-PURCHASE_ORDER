// Notas del archivo:
// - Secuencia de comando:
//      - PURCHASE ORDER PRINT TEMPLATE (customscript_print_template_po	)
// - Registro:
//      - Orden de Compra (purchaseorder)

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N'],
    
    (N) => {

        const {record,search} = N;
        const {serverWidget} = N.ui;

        /**
         * 
         * BIO_PDF_ORDEN_COMPRA_CONTROL     -> formnumber=249
         * BIO_PDF_ORDEN_COMPRA             -> formnumber=163
         * BIO_PDF_ORDEN_COMPRA_ESTANDAR    -> formnumber=183
         * BIO_PDF_ORDEN_COMPRA_IMPORTACION -> formnumber=197
         */

        const printHTMLSelect = () => {
            let html = `
            <div id='elementoSelect'></div>

            <script>
            require(['N/currentRecord'],function(currentRecord){
                    const BASE_URL = "https://6462530.app.netsuite.com/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&";
                    
                    let idTransaccion = currentRecord.get().id;

                    let select = document.createElement("select");
                    select.onchange = function (){
                        let selectedValue = select.value;
                        if(selectedValue!=="0") window.open(selectedValue, "_blank");
                    };
                    let opt0 = document.createElement("option");
                    let opt1 = document.createElement("option");
                    let opt2 = document.createElement("option");
                    let opt3 = document.createElement("option");
                    let opt4 = document.createElement("option");
                    opt0.value = "0";
                    opt0.text = "-Seleccione-";
                    opt1.value = BASE_URL+"formnumber=183&trantype=purchord&&id="+idTransaccion+"&label=Orden+de+Compra&printtype=transaction";
                    opt1.text = "Orden Compra Estandar";
                    opt2.value = BASE_URL+"formnumber=197&trantype=purchord&&id="+idTransaccion+"&label=Orden+de+Compra&printtype=transaction";
                    opt2.text = "Orden Compra Importacion";
                    opt3.value = BASE_URL+"formnumber=163&trantype=purchord&&id="+idTransaccion+"&label=Orden+de+Compra&printtype=transaction";
                    opt3.text = "Orden Compra Distribución Resumido";
                    opt4.value = BASE_URL+"formnumber=249&trantype=purchord&&id="+idTransaccion+"&label=Orden+de+Compra&printtype=transaction";
                    opt4.text = "Orden Compra Distribución detallado";
                    select.add(opt0);
                    select.add(opt1);
                    select.add(opt2);
                    select.add(opt3);
                    select.add(opt4);

                    document.getElementById('elementoSelect').replaceWith(select)
            })
            </script>
            
            `;

            return html;
        }
        const beforeLoad = (scriptContext) => {
            if(scriptContext.type!=='view') return;

            let form = scriptContext.form;

            let htmlField = form.addField({
                id:'custpage_field_html_select',
                label:'  ',
                type:'inlinehtml'
            });

            form.insertField({
                field:htmlField,
                nextfield:'tranid'
            });

            htmlField.defaultValue = printHTMLSelect();
        }


        return {beforeLoad}

    });
