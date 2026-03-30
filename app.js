let cardcontainer = document.getElementById('cardcontainer')
let modal = document.getElementById('modal')
let allproducts = []
let sebet = []
fetch('https://69c9613068edf52c954e7935.mockapi.io/ProDucts')
.then(res => res.json())
.then(data => {
    allproducts = data
    renderdata(data)
    data.map(item => {
        cardcontainer.innerHTML += `
            <div class="border border-[#889397] w-full max-w-[260px] px-[10px] pb-[30px] pt-[10px] rounded-[10px] hover:border-[#0aad0a]  hover:shadow-[0_0_15px_#dfe2e1] duration-300 ease-in-out">
                <img  src="${item.image}" alt=""/>
                <div>
                    <p class="text-[#889397] text-[.9em]">${item.category}</p>
                    <p class="text-[#323232] text-[.99em]  font-[500] pt-2">${item.title}</p>
                    <p class="text-[#eab308] text-[.9em] pt-1"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span class="text-[#889397] pl-4">${item.rating}</span></p>
                    <div class="flex justify-between pt-2">
                        <p class="text-[#323232] font-[700]">${item.price}</p>
                        <button onclick="addbasket(${item.id})" class="bg-[#0aad0a] text-white px-2 rounded-[10px] py-0.5 flex justify-center items-center">+ Add</button>
                    </div>
                </div>
            </div>
        `
    })  
})

function opensebet(){
    modal.style.display = 'block'
}
function closesebet(){
    modal.style.display = 'none'

}
let countproducts = document.getElementById('countproducts')
function addbasket(id){
    let existproduct = sebet.find(item => item.id === id)
    if(existproduct){
        existproduct.count += 1
    }
    else{
        sebet.push({id  : id  , count : 1})
    }
    countproducts.innerHTML = sebet.length
    showsebet()
}
let totalpay = document.getElementById('totalpay')
function showsebet(){
    let inmodal = document.getElementById('inmodal')
    let total = 0
    inmodal.innerHTML = sebet.map((item , index) => {
        const prdcts = allproducts.find(t => t.id == item.id)
        total += +prdcts.price * item.count
        return `
        
            <div class="flex items-center gap-3 border-b py-2">
                <img src='${prdcts.image}' class="w-16 h-16 rounded-full" />
                 <div>
                    <p class="text-sm text-slate-900 font-semibold">${prdcts.title}</p>
                 <p class="flex gap-2">   <span onclick = "update(${index} , 'minus')" class="font-[700]">-</span> <span class=" text-slate-500 mt-0.5">${(+prdcts.price * item.count)} $</span> <span onclick = "update(${index} , 'plus')" class="font-[700]">+</span></p>
                 <p> say : ${item.count}</p>
                </div>
                <p onclick="removesebet(${index})" class="ml-auto cursor-pointer text-red-500"><i class="fa-solid fa-xmark"></i></p>
            </div>

        `
    }).join('')
    totalpay.innerHTML = `<p>${total} $  </p>`

}
function removesebet(index){
    sebet.splice(index , 1)
    if(sebet.length == 0){
        modal.style.display = 'none'
    }
    else{
        countproducts.innerHTML = sebet.length
    }
    showsebet()
}

function update(index , change){
    if(change === 'plus'){
        sebet[index].count += 1
    }
    else if(change === 'minus'){
        if(sebet[index].count > 1){
            sebet[index].count -= 1 
        }

    }
    else{
        sebet.splice(index , 1)
    }
    showsebet()
}

//Category Filter

let categorycontainer = document.getElementById('categorycontainer')
fetch('https://69c9613068edf52c954e7935.mockapi.io/ProductsCategory')
.then(response => response.json())
.then(responsedata => {
    responsedata.map(category => {
        categorycontainer.innerHTML += ` <li onclick="filterproducts('${category.categoryname}')" class="bg-[#0aad0a] text-white rounded-[10px] py-1 px-3 hover:bg-[#0d7e0f] duration-300 ease-in-out">${category.categoryname}</li>`
    })
})

function renderdata(data){
    cardcontainer.innerHTML = data.map(item => `
        <div class="border border-[#889397] w-full max-w-[260px] px-[10px] pb-[30px] pt-[10px] rounded-[10px] hover:border-[#0aad0a]  hover:shadow-[0_0_15px_#dfe2e1] duration-300 ease-in-out">
                <img  src="${item.image}" alt=""/>
                <div>
                    <p class="text-[#889397] text-[.9em]">${item.category}</p>
                    <p class="text-[#323232] text-[.99em]  font-[500] pt-2">${item.title}</p>
                    <p class="text-[#eab308] text-[.9em] pt-1"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span class="text-[#889397] pl-4">${item.rating}</span></p>
                    <div class="flex justify-between pt-2">
                        <p class="text-[#323232] font-[700]">${item.price}</p>
                        <button onclick="addbasket(${item.id})" class="bg-[#0aad0a] text-white px-2 rounded-[10px] py-0.5 flex justify-center items-center">+ Add</button>
                    </div>
                </div>
            </div>
    `).join('')
}

function filterproducts(name){
    const filterres = (name.toLowerCase() === "all") ? allproducts  : allproducts.filter(f => f.category === name)

    renderdata(filterres)
}

// Search
let search = document.getElementById('search')
let blocks = document.getElementById('blocks')
let srchcontainer = document.getElementById('srchcontainer')

search.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase()

    if(value === ""){
        blocks.style.display = 'none'
        renderdata(allproducts)
    } else {
        blocks.style.display = 'flex'
        searchdata(value)
    }
})
function searchdata(keyword){
    const sf = allproducts.filter(item => 
        item.title.toLowerCase().includes(keyword)
    )

    serachdatas(sf)
    renderdata(sf)
}
function serachdatas(data) {

    srchcontainer.innerHTML = data.map(p => `
         <div class="flex items-center flex-row gap-8 pb-3 border-b py-2">
                    <img src="${p.image}" class="w-[70px] h-[70px] rounded-full object-cover rounded">
                    <div class="flex flex-wrap gap-2">
                     <h4 class="mt-2 text-white font-bold">${p.title}</h4>
                   <p class="text-white font-[500]">${p.price} $</p>
                    <p class="text-white">${p.category}</p>
                    </div>
                                    </div>
        `).join('')
}