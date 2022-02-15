
base_data = {
  "2019-ag-6051": "FATIMA BASHIR",
  "2019-ag-6052": "ANIQA FAYYAZ",
  "2019-ag-6053": "AHTISHAM",
  "2019-ag-6054": "MUHAMMAD ABUBAKR",
  "2019-ag-6055": "JAHANZAIB BABAR",
  "2019-ag-6056": "MUHAMMAD SHOAIB AKBAR",
  "2019-ag-6057": "KHADIJAH RASOOL",
  "2019-ag-6058": "ANSA SALEEM",
  "2019-ag-6059": "ZUHA QAMMAR",
  "2019-ag-6060": "SYED ASAD ALI BUKHARI",
  "2019-ag-6061": "MUHAMMAD USAMA SHABIR",
  "2019-ag-6062": "MUHAMMADSHAHZAIB",
  "2019-ag-6063": "BUSHRA HAMEED",
  "2019-ag-6065": "HINA FAROOQ",
  "2019-ag-6066": "ASIMA SHABBIR",
  "2019-ag-6067": "MUHAMMAD KHAWAR AZEEM",
  "2019-ag-6068": "MUHAMMAD AHTESHAM SARWAR",
  "2019-ag-6069": "MAIRA",
  "2019-ag-6070": "MAKARAM TAYYAB",
  "2019-ag-6071": "ABDULLAH ALTAF",
  "2019-ag-6072": "TALHA AZEEM",
  "2019-ag-6073": "MUHAMMAD NOMAN",
  "2019-ag-6074": "TASBIHA TANVEER",
  "2019-ag-6075": "SHAFA ZAMAN",
  "2019-ag-6076": "ZOHA USMAN",
  "2019-ag-6077": "MISHAL JAVAID",
  "2019-ag-6078": "NABEEL UR REHMAN",
  "2019-ag-6079": "MUHAMMAD ZAIN",
  "2019-ag-6080": "LAIBA",
  "2019-ag-6081": "MUHAMMAD UMER",
  "2019-ag-6082": "MOHAMMAD RUMAN WARIS",
  "2019-ag-6084": "SAMIA TANVEER",
  "2019-ag-6085": "MANAL KHALID",
  "2019-ag-6086": "HAFIZA KHADIJA SULEMAN",
  "2019-ag-6087": "MUHAMMAD HASSAN KHALID",
  "2019-ag-6088": "AASHIR NADEEM",
  "2019-ag-6089": "MUHAMMAD HAMZA IMRAN BAJWA",
  "2019-ag-6090": "ADEEL AHMAD",
  "2019-ag-6091": "MUHAMMAD ABUBAKAR",
  "2017-ag-7217": "RANA TALHA",
  "2017-ag-7297": "Ahmed Raza",
  "2017-ag-7204": "Umer Munir",
  "2019-ag-6137": "Aneeb Hassan",
  "2018-ag-8240": "Usama Shahbaz"
} 
// base_data = {
//     "2019-ag-8829" : "ag","2019-ag-8830" : "ag","2019-ag-8831" : "ag","2019-ag-8832" : "ag","2019-ag-8833" : "ag","2019-ag-8834" : "ag","2019-ag-8835" : "ag","2019-ag-8836" : "ag","2019-ag-8837" : "ag","2019-ag-8838" : "ag","2019-ag-8839" : "ag","2019-ag-8840" : "ag","2019-ag-8841" : "ag","2019-ag-8842" : "ag","2019-ag-8843" : "ag","2019-ag-8844" : "ag","2019-ag-8845" : "ag","2019-ag-8846" : "ag","2019-ag-8847" : "ag","2019-ag-8848" : "ag","2019-ag-8849" : "ag","2019-ag-8850" : "ag","2019-ag-8851" : "ag","2019-ag-8852" : "ag","2019-ag-8853" : "ag","2019-ag-8854" : "ag","2019-ag-8855" : "ag","2019-ag-8856" : "ag","2019-ag-8857" : "ag","2019-ag-8858" : "ag","2019-ag-8859" : "ag","2019-ag-8860" : "ag","2019-ag-8861" : "ag","2019-ag-8862" : "ag","2019-ag-8863" : "ag","2019-ag-8864" : "ag","2019-ag-8865" : "ag","2019-ag-8866" : "ag","2019-ag-8867" : "ag","2019-ag-8868" : "ag","2019-ag-8869" : "ag","2019-ag-8870" : "ag","2019-ag-8871" : "ag","2019-ag-8872" : "ag","2019-ag-8873" : "ag","2019-ag-8874" : "ag","2019-ag-8875" : "ag"
// }
result_table = document.getElementById("result_table")
submit = document.getElementById("submit")



submit.addEventListener("click",()=>{
    
    document.getElementById("error").style.visibility = "collapse"
    var course_code = document.getElementById("course-code").value.toUpperCase()
    if(course_code === ""){
        document.getElementById("error").innerHTML = "Enter the Ag# !"
        document.getElementById("error").style.visibility = "visible"
        return        
    }
    // document.getElementById("loading_anim").style.height = "300px"
    for(var ag in base_data){
        var request = new Request('http://127.0.0.1:5000/'+ag);
        fetch(request).then(function(response) {
            if(response.ok){
            return response.json()
        }else{
            return -1
        }
        }).then(function(response) {
            if(response != -1){
               setResult(response,course_code,ag)
            }else{
             throw new Error("Server Not Responding")   
            }
        });
    }

});

function setResult(response,course_code,ag){
    var count = Object.keys(response).length;
    
    for(let i=1; i<=count ; i++){
        res = response[i]
        if(res["course_code"] === course_code){
            
            if(res["grade"] == "A"){
                var table_n = "A_result_table";
            }else if(res["grade"] == "A"){
                var table_n = "A_result_table";
            }else if(res["grade"] == "B"){
                var table_n = "B_result_table";
            }else if(res["grade"] == "C"){
                var table_n = "C_result_table";
            }else if(res["grade"] == "D"){
                var table_n = "D_result_table";
            }else if(res["grade"] == "F"){
                var table_n = "F_result_table";
            }else if(res["grade"] == "I"){
                var table_n = "I_result_table"
            }else{
                var table_n = "I_result_table"
            }
            
            document.getElementById(table_n).style.visibility = "visible"
            var rows_count = document.getElementById(table_n).rows.length;
            var row = document.getElementById(table_n).insertRow(rows_count)
            var course_code_c = row.insertCell(0)
            var ag_c = row.insertCell(1)
            var mid_c = row.insertCell(2)
            var assignment_c = row.insertCell(3)
            var final_c = row.insertCell(4)
            var practical_c = row.insertCell(5)
            var total_mark_c = row.insertCell(6)
            var grade_c = row.insertCell(7)
            
            var rows = document.getElementById(table_n).rows[0]
            var cell = rows.cells[0];
            var value = cell.innerHTML
            cell.innerHTML = (parseInt(value)+1)

            course_code_c.innerHTML = response["name"]
            ag_c.innerHTML = response["ag"]
            total_mark_c.innerHTML = res["total_marks"]
            grade_c.innerHTML = res["grade"]
            mid_c.innerHTML = res["mid"]
            assignment_c.innerHTML = res["assignment"]
            final_c.innerHTML = res["final"]
            practical_c.innerHTML = res["practical"]
        }
    }
}