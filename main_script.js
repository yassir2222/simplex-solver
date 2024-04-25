
var nbr_var=0
var desc_var=[]
var Z=[]
var nbr_Contr=0
var contrainte=[]
var V=[]
var T=[]
var NZ=[]
var VB=[]
var VHB=[]
var str3=``
function SaisitVariable(){
nbr_var=document.getElementById('var-number').value
var str="<p>La description des variables (optional):"
console.log(nbr_var)
for(let i=1;i<=nbr_var;i++){
    str+=`<div class='input-group mb-3'>
        <span class='input-group-text text-bg-dark' id='basic-addon1'>X<sub>${i}</sub></span>
        <input type='text' class='form-control vardesc' id='var-${1}'><br>
        </div>
    </div>`
   
}
str+=` <div class="d-grid gap-2 col-6 mx-auto">
<button class="btn btn-info" type="button" onclick="ValiderVariable()"><span class="fw-semibold">Valider</span></button>
</div>`
document.getElementById("progress_bar").style.width = "25%"
document.getElementById("progress_bar").innerHTML="25%"
document.getElementById('descriptionVar').innerHTML=str
}

function AfficherVariable(){
    Variable_cont=document.getElementById("var-container")
    Variable_cont.classList.add("row-cols-md-2")
    document.getElementById("first-card").style.width=""
    str=`<div class="col" >
    <div class="card shadow">
      <div class="card-header  text-bg-info fs-5 fw-semibold">Affichage</div>
      <div class="card-body">
        <div class="card-text" id="afficher-Var-latex"></div>
      </div>
    </div>
  </div>`
str2=String.raw`
  $$\left\{
    \begin{array}{lr}
`
const regex = /\s/ig;
for(let i=0;i<=nbr_var-1;i++){
    console.log(desc_var[i].replace(regex, '\:'))
str2+=String.raw`x_${i+1} :\: ${desc_var[i].replace(regex, String.raw`\:`)}\\`
}

str2+=String.raw`\end{array}
\right.
$$`

  document.getElementById('Afficher-var').innerHTML=str
  document.getElementById('afficher-Var-latex').innerHTML=str2
  
  MathJax.typeset()
}

function saisitObjectif(){
    str=`<br><br>
    <div class="row row-cols-1 mx-5" id="obj-container">
        <div class="col " >
            <div class="card  mx-auto shadow"  id="first-card" >
                <div class="card-header  text-bg-warning fs-5 fw-semibold">Les Variables</div>
                <div class="card-body">
                  <p class="card-text">donner les valeures de la fonction objectif :</p>
                  <div class="input-group mb-3">
                    <label for="X1" class="col-form-label fw-semibold" style="margin-right: 5px;margin-left: 5px;">Z=</label>
                  `
    for(let i=1 ;i<=nbr_var;i++){
        if(i==nbr_var){
            str+=`<input type="number" id="X${i}" value="0" min="0" class="form-control">
        <label for="X${i}" class="col-form-label fw-semibold" style="margin-right: 5px;margin-left: 5px;">* X<sub>${i}</label>`
        }else{
            str+=`<input type="number" id="X${i}" value="0" min="0" class="form-control">
            <label for="X${i}" class="col-form-label fw-semibold" style="margin-right: 5px;margin-left: 5px;">* X<sub>${i} +</label>`
        }

    }
    str+=`</div>
    <p>L'objectif est  : <b>max(Z)</b></p>
    <br>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-warning" type="button" onclick="Validerobjctif()"><span class="fw-semibold">Valider</span></button>
    </div>
  </div>
</div>
</div>
<div id="Afficher-obj">
    </div>
</div>`
document.getElementById("progress_bar").style.width = "50%"
document.getElementById("progress_bar").innerHTML="50%"
document.getElementById('Saisit-var').innerHTML=str

}

function ValiderVariable(){
    for(let i=0;i<=nbr_var-1;i++){
    desc_var[i]=document.getElementsByClassName('vardesc')[i].value
    }
    
    //console.log(desc_var)
    AfficherVariable()
    saisitObjectif()
}
//console.log(desc_var)

function AfficherObjectif(){
    str1=`<div class="col" >
    <div class="card shadow">
      <div class="card-header  text-bg-warning fs-5 fw-semibold">Affichage</div>
      <div class="card-body">
        <div class="card-text" id="afficher-obj-latex"></div>
      </div>
    </div>
  </div>`
    str=String.raw`$$ La\:fonction\:Objectif\:est\::\\`
    str+=String.raw` Z =`
    k=0
    for(let i=0 ;i<=nbr_var-1;i++){
        
        if(Z[i]!=0){
            if(k==0){
                str+=String.raw`${Z[i]}X_${i+1}`
                k=1
            }else{
                str+=String.raw`+${Z[i]}X_${i+1}`
            }  
        }
    }
    str+=String.raw`$$`
    Variable_cont=document.getElementById('obj-container')
    Variable_cont.classList.add("row-cols-md-2")
    document.getElementById('Afficher-obj').innerHTML=str1

    document.getElementById('afficher-obj-latex').innerHTML=str
    MathJax.typeset()
    SaisitNbrContraint()
}
function Validerobjctif(){
    for(let i=1 ;i<=nbr_var;i++){
        Z[i-1]=document.getElementById(`X${i}`).value
    }
    AfficherObjectif()
}

function SaisitNbrContraint(){
    str=`<div class="row row-cols-1 mx-5" id="Contr-container">
    <div class="col " >
        <div class="card shadow mx-auto" id="first-card">
            <div class="card-header  text-bg-success fs-5 fw-semibold">L'Objectif</div>
                <div class="card-body">
                    <p class="card-text">donner le nombre de Contraintes :</p>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control"id="Contr-number" min="1" value="1">
                        <button class="btn btn-outline-success fs-5 fw-semibold" type="button" id="btn-var-description" onclick="SaisitContraint()">+</button>
                    </div>
                    <div id="Contraintes"> </div>
                </div>
            </div>
        </div>
    
    <div id="afficher-tab">
    </div>
</div>
    `
    document.getElementById("Saisit-contrainte").innerHTML=str
}

function SaisitContraint(){
    nbr_Contr=document.getElementById("Contr-number").value
    str=``
    for(let i=1 ; i<=nbr_Contr ; i++){
        str+=
        `<p><i>Contrainte N&deg; ${i}:</i></p>
            <div class="input-group mb-3" id="C${i}"> 
        `
        for(j=1 ;j<=nbr_var ;j++){
            if(j==nbr_var){
                str+=`<input type="number" id="XC${j}${i}" value="0" min="0" class="form-control">
                <label for="XC${j}${i}" class="col-form-label fw-semibold" style="margin-right: 5px;margin-left: 5px;">* X<sub>${j}</sub> &le; </label>
                <input type="number" id="VC${i}" value="0" min="0" class="form-control">
                `
            }else{
                str+=`<input type="number" id="XC${j}${i}" value="0" min="0" class="form-control">
                <label for="XC${j}${i}" class="col-form-label fw-semibold" style="margin-right: 5px;margin-left: 5px;">* X<sub>${j}</sub>+</label>
                `
            }
        
        }
        str+=`</div>` 
    }
    str+=`<br>
        <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-success" type="button" onclick="ValiderContraint()"><span class="fw-semibold">Valider</span></button>
        </div>
    `
        document.getElementById("progress_bar").style.width = "75%"
        document.getElementById("progress_bar").innerHTML="75%"    
    document.getElementById("Contraintes").innerHTML=str                  
}



function ValiderContraint(){
    C=[]
    let j=0,i=0

    for(i=1 ;i<=nbr_Contr ; i++){
        C=[]
        for( j=1 ;j<=nbr_var ;j++){
            C[j-1]=parseFloat(document.getElementById(`XC${j}${i}`).value) 
        }
        C[j-1]=parseFloat(document.getElementById(`VC${i}`).value)
        contrainte[i-1]=C
    }
    for(let i=1;i<=nbr_var;i++){
        VHB.push(`x${i}`)
    }
    for(let i=1;i<=nbr_Contr;i++){
        VB.push(`e${i}`)
    }
    //contrainte.unshift(Z)
    //contrainte[0].push('0')
    
    CaclculerTableau()
}


function CaclculerTableau(){
temp =[]
var i=0,j=0
T = structuredClone(contrainte);

for(i=0;i<nbr_Contr;i++){
    temp[i]=T[i][nbr_var]
    T[i].pop()
    T[i].unshift(0)
}


NZ[0]=1
for(i=1; i<=nbr_var;i++){
    NZ[i]=-1*Z[i-1]
}
NZ.push(0)



    let k=0

    for( i=0 ;i<nbr_Contr ; i++){
        NZ.push(0)
        for( j=0 ;j<nbr_Contr ; j++){
            
            if(j==k){
                T[i][parseInt(nbr_var)+j+1]=1
            }else{
                T[i][parseInt(nbr_var)+j+1]=0
            }
        }
        k++
    }
    for(i=0;i<nbr_Contr;i++){
        T[i][T[i].length]=temp[i]
    }
    T.unshift(NZ)
    console.table(T)
   // AfficherTableau()
    afficherResultat()
    
}

function AfficherTableau(){
    Variable_cont=document.getElementById("Contr-container")
    Variable_cont.classList.add("row-cols-md-2")
    str2=``
    str=``
    
    str2+=String.raw`
    $$
        \left[\begin{array}{
    `
    Column=String.raw``
    for(let i=0; i<T[0].length-1;i++){
        Column+=String.raw` c`
    }
    Column+=String.raw` |c}`
    C_label=`Z &`
    for(i=1;i<T[0].length-1;i++){
        if(i<=nbr_var){
            C_label+=`x_${i} & `
        }else{
            C_label+=`e_${i-nbr_var} & `
        }
        
    }
    C_label+=String.raw`\\`
    str2+=Column
    str2+=C_label
    i=0
    j=0
    T.forEach((row) => {
        j=0
        row.forEach((element) => {
          if(j==row.length-1){
            str2 += String.raw `${element} \\`
          }else{
            str2 += String.raw `${element} & `
          }
          j++
        });
        
        if(i==0){
            str2+=String.raw`\hline` 
            i++
        }
      });
      str2 =String.raw`${str2.substring(0, str2.length - 2)}`
      str2+=String.raw`\end{array}\right] $$`

      str=`<div class="col " >
    <div class="card shadow mx-auto" id="first-card">
        <div class="card-header  text-bg-success fs-5 fw-semibold">Le Tableau</div>
            <div class="card-body">
                <div id="Content-aff"></div>
            </div>
        </div>
        </div>
    </div>`
      document.getElementById('afficher-tab').innerHTML=str
      //document.getElementById('Content-aff').innerHTML=str2
      MathJax.typeset()


}

function afficherResultat(){
    str=`<br><br><div class="row row-cols-1 mx-5" id="Contr-container">
    <div class="col " >
        <div class="card shadow mx-auto " id="first-card">
            <div class="card-header  text-bg-danger fs-5 fw-semibold">Résultat :</div>
                <div class="card-body px-5">
                    <p class="card-text">Voici les étapes</p>
                    
                    <div id="resultat-final">

                    </div>
                </div>
            </div>
        </div>
    
    <div id="afficher-tab">
    </div>
</div>
<br><br>
    `
document.getElementById('Aff-resultat').innerHTML=str
document.getElementById("progress_bar").style.width = "100%"
document.getElementById("progress_bar").innerHTML="100%"
Calculer()

}


function Calculer(){
/*
    var nbr_var=2
    var desc_var=[]
    var Z=[3,5]
    var nbr_Contr=3
    var contrainte=[[1,0],[0,2],[3,2]]
    var V=[]
    var T=[[1,-3,-5,0,0,0,0],
          [0,1,0,1,0,0,4],
          [0,0,2,0,1,0,12],
          [0,3,2,0,0,1,18],
          ]
    
    var NZ=[1,-3,-5,0,0,0,0]
  */
    let Ve=0,Vs=0
    var n=0,m=0 //n:nbr ligne , m:nbr Column
    var FIN=0
    var cpt=0
    var Lp=0
    var VB=['e1','e2','e3']
    var VHB=['x1','x2']
    T.forEach((row) => {
        n++
        m=row.length
    });
    
while(FIN==0){
    
    //trouver Ve
    cpt++
    min=T[0][1]
   
    for(j=1;j<=nbr_var;j++){
        
        if(T[0][j]<=min){
            min=T[0][j]
            Ve=j
            console.log("min :",T[0][j],min,j,Ve)
        }
        
    }
    
    //trouver Lp
    k=0
    for(i=1;i<=nbr_Contr;i++){
        if(T[i][Ve]!=0){
            temp=T[i][m-1]/T[i][Ve]
            if(k==0){
                min=temp
                Lp=i
                k++
            }else{
                if(temp<=min){
                    Lp=i
                }
            }
        }
    }
    console.log(Ve,Lp)
//calaculer Vs
    Vs=Lp    
// Selectionner le Pivot
    Pivot=T[Lp][Ve]
// modifier VB et VHB
for(let i=0;i<VHB.length;i++){
    if(VHB[i]==`x${Ve}`){
        VHB.splice(i,1)
        VB.push(`x${Ve}`)
    }
}
for(let i=0;i<VB.length;i++){
    if(VB[i]==`e${Vs}`){
        VB.splice(i,1)
        VHB.push(`e${Vs}`)
    }
}
console.log(VB)
console.log(VHB)
//Lp=Lp/pivot
for(j=0;j<m;j++){
    T[Lp][j]/=Pivot
}
console.log(n,m)
var Va,k=0
TVa=[]
for(i=0;i<n;i++){
    for(j=0;j<m;j++){
        if(i!=Lp){
            if(k==0){
                Va= T[i][Ve]/T[Lp][Ve]
                k++
            }
            
            T[i][j]=T[i][j]-Va*T[Lp][j]
        }
    }
    TVa.push([i,Va])
    k=0
}
for(j=0;j<m;j++){
    if(T[0][j]<0){
        FIN=0
        break
    }
    FIN=1
    
}
afficherMatrix(T,VB,VHB,Z,Ve,Lp,n,m,cpt,TVa)

console.table(T)
} 

optimal=[]
for(i=0;i<n;i++){
    for(j=1;j<m;j++){
        if(T[i][j]!=0 && j<=nbr_var){
            ligne=i
            optimal.push([j,T[i][m-1]])
        }
    }
    
}
console.table(optimal)
str4=`<br><h4 class='header__center'> Résultat finale</h4>`
str4+=`<p><b>Z</b>=${T[0][m-1]} <br>`
optimal.forEach((row) => {
    str4+=`<b>X${row[0]}*</b>=${row[1]} <br> `
})
str4= str4.slice(0, -2)
str4+="</p><br>"
document.getElementById('resultat-final').innerHTML+=str4

}





function afficherMatrix(T,VB,VHB,Z,Ve,Lp,n,m,e,TVa){

str3=`<h4 class='header__center'> Etape ${e}</h4>`
    str3+=`<table class="table table-bordered">`
    str3+=`<thead>`
    str3+=`<tr>`
    str3+=`<th scope="col"> Z </th> `
    for(i=1;i<m-1;i++){
        if(i<=nbr_var){
            str3+=`<th scope="col"> x${i} </th> `
        }else{
            str3+=`<th scope="col"> e${i-nbr_var} </th> `
        }
        
    }
    str3+=`<th scope="col"></th> `
    str3+='</tr></thead><tbody>'
    i=0
    T.forEach((row) => {
        j=0
        str3+=`<tr>`
        row.forEach((element) => {
            if(! Number.isInteger(element)){
                element=element.toPrecision(2)
            }
            if(j==Ve && i==Lp){
            str3+=`<td class="table-primary"> ${element}</td>`
           }else if(j==Ve && i!=Lp){
            str3+=`<td class="table-warning"> ${element}</td>`
           }else if(i==Lp && j!=Ve){
            str3+=`<td class="table-info"> ${element}</td>`
           }else{
            str3+=`<td>${element}</td>`
           }
           j++
        });
        i++
        str3+=`</tr>`
    });
    str3+='</table>'
    str3+=`<div class="row">
    <div class="col">`
    str3+=`<p><b>VB=</b>`
    VB.forEach((element) => {str3+=`${element},`})
    str3 = str3.slice(0, -1)
    str3+=`<br>`
    str3+=`<b>VHB=</b>`
    VHB.forEach((element) => {str3+=`${element},`})
    str3 = str3.slice(0, -1)
    str3+='</p><br>'
    str3+=`</div>`
    str3+=` <div class="col">`
    TVa.forEach((row) => {
        str3+=`L${row[0]} = L${row[0]} -(${row[1]})L${Lp} <br>`
    })
    str3+=`</div></div>`
    
    if(e==1){
        document.getElementById('resultat-final').innerHTML=str3
    }else{
        document.getElementById('resultat-final').innerHTML+=str3
    }


}

