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
            require(['N/currentRecord', 'N/runtime'],function(currentRecord, runtime){
                    const BASE_URL = "https://"+ runtime.accountId + ".app.netsuite.com/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&";
                    
                    let idTransaccion = currentRecord.get().id;

                    // Definición de las opciones del select en un array
                    let opciones = [
                        { value: "0", text: "-Seleccione-" },
                        { value: "formnumber=183&trantype=purchord&id=" + idTransaccion + "&label=Orden+de+Compra&printtype=transaction", text: "Orden Compra Estandar" },
                        { value: "formnumber=197&trantype=purchord&id=" + idTransaccion + "&label=Orden+de+Compra&printtype=transaction", text: "Orden Compra Importacion" },
                        { value: "formnumber=163&trantype=purchord&id=" + idTransaccion + "&label=Orden+de+Compra&printtype=transaction", text: "Orden Compra Distribución Resumido" },
                        { value: "formnumber=249&trantype=purchord&id=" + idTransaccion + "&label=Orden+de+Compra&printtype=transaction", text: "Orden Compra Distribución detallado" }
                    ];

                    let select = document.createElement("select");
                    select.onchange = function (){
                        let selectedValue = select.value;
                        if(selectedValue !== "0") window.open(selectedValue, "_blank");
                    };

                    // Crear y añadir las opciones al select usando un bucle
                    opciones.forEach(function(opcion) {
                        let url = "";
                        if(opcion.value!="0"){
                            url = BASE_URL + opcion.value
                        }else{
                            url = "0";
                        }
                        let opt = document.createElement("option");
                        opt.value = url;
                        opt.text = opcion.text;
                        select.add(opt);
                    });

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

            // Agrega un campo label que actuará como la etiqueta para el campo HTML.
            let labelField = form.addField({
                id: 'custpage_html_select_label',
                type: 'label',
                label: 'Seleccione el Tipo de Orden de Compra'
            });

            // Configura la ubicación del campo label en el formulario.
            form.insertField({
                field: labelField,
                nextfield: 'tranid' // Asegúrate de que este sea el ID del campo que sigue a tu campo personalizado.
            });

            form.insertField({
                field:htmlField,
                nextfield:'tranid'
            });

            htmlField.defaultValue = printHTMLSelect();
        }


        return {beforeLoad}

    });
