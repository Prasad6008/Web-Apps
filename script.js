   let todos = []

        let del_all_btn = document.getElementById('del_all')
        let sure_del_option = document.querySelector('.sureDelete')

        toggleDeleteAllButton()
        hidesureDelete()

        //Checking the input
        function start()
        {
            let input = document.getElementById('input').value  // https://github.com/Prasad6008
            

            if(input.length == 0)
            {
                alert("Input cannot be empty...")//Coded by Prasanth
            }
            else
            {
                make_array(input)    
                toggleDeleteAllButton()
            }
        }

        function toggleDeleteAllButton() 
        {
            if (document.querySelector('.todos').hasChildNodes()) {
                del_all_btn.style.display = 'block'
            } else {
                del_all_btn.style.display = 'none'
            }
        }
//Coded by Prasad https://github.com/Prasad6008
        del_all_btn.addEventListener('click', () => 
        {
            //Sure delete 
            sure_del_option.style.display = 'block'

            let no = document.getElementById('no')
            no.onclick = () =>
            {
                sure_del_option.style.display = 'none'
            }

            let yes = document.getElementById('yes')
            yes.onclick = () =>
            {
                let todoContainer = document.querySelector('.todos')
                todoContainer.innerHTML = ''  // Remove all todo elements from the DOM
                todos = []  // Clear the todos array //Coded by Prasad https://github.com/Prasad6008
                localStorage.removeItem('KEY')  // Clear from localStorage , https://github.com/Prasad6008
                sure_del_option.style.display = 'none'
                del_all_btn.style.display = 'none'//Coded by Prasad
            }
            
            toggleDeleteAllButton()  // Hide the "Delete All" button
        });
       
        //Hiding sure delete 
        function hidesureDelete()
        {
            sure_del_option.style.display = 'none'
        }

        //Making Array
        function make_array(x)
        {
            todos.push(x)
            make_list(x)
        }
     //Coded by Prasanth   
        //Make list of todos to show user
        function make_list(y)
        {
            let para = document.createElement('p')
            document.querySelector('.todos').appendChild(para).innerHTML = y
            para.style.color = 'white'
            para.style.textAlign = 'left'
            para.style.borderBottom = '1px dashed white'
            para.style.paddingBottom = '8px'
            input.value = ""
        

        //Set the todos array to the local storage
        localStorage.setItem('KEY',JSON.stringify(todos))//Coded by Prasad

        //Editor Options
        para.addEventListener('dblclick',()=>
        {
            let editor = document.querySelector('.editor')
            editor.style.display = 'block'
            document.getElementById('edit_input').value = para.innerHTML

            setupEditpopup(para, para.innerHTML)
        })

        //To hide
        document.addEventListener('click', function(event) 
        {
            var target = event.target;
            var div = document.querySelector('.editor')
          
            if (target !== div && !div.contains(target)) 
            {
              div.style.display = 'none';
            }
        })
        }
//Coded by Prasanth
         //Edit events:
         function setupEditpopup(para , orginalTask)
         {
             //Edit (Delete) ✔️
             document.getElementById('edit_delete').onclick = ()=> 
             {
                 console.log("working..")
                 if(document.querySelector('.todos').contains(para))
                 {
                 document.querySelector('.todos').removeChild(para)
                 remove(orginalTask)
                 }//Coded by Prasad
             }

             //Edit (Submit)
            document.getElementById('edit_submit').onclick = ()=>
            {
                if(document.querySelector('.todos').contains(para))
                {
                    console.log(para)
                    document.querySelector('.editor').style.display = 'none'
                    let edited_value = document.getElementById('edit_input').value
                    let current_index = todos.indexOf( orginalTask)
                    console.log(edited_value,current_index)

                    //changing  : https://github.com/Prasad6008
                    let data  = JSON.parse(localStorage.getItem('KEY')) || []
                    let data_index = data.indexOf(para.innerHTML)
                    console.log(data_index)

                    if (current_index !== -1) {
                        // Update the DOM element's content
                        para.innerHTML = edited_value;
        
                        // Update the todos array with the new value
                        setting(current_index, edited_value);
                    }
                }
               
            }
         }
//Coded by Prasanth
        //Deleting
        function remove(y)
        {
            let index = todos.indexOf(y)
                if(y !== -1)
                {
                     todos.splice(index,1)
                }
                localStorage.setItem('KEY',JSON.stringify(todos))
                document.querySelector('.editor').style.display = 'none'
                toggleDeleteAllButton();
        }

        //Editing 
        function setting(i,v)
        {
            console.log(i,v)
            todos[i] = v
            console.log(todos)
            localStorage.setItem('KEY',JSON.stringify(todos))
        }

        //when reloded to make existing data visible
        window.onload
        {
            console.log("Loaded..")

            todos = JSON.parse(localStorage.getItem('KEY')) || []//Coded by Prasad : https://github.com/Prasad6008

            todos.forEach(val =>
            {
                make_list(val)
            })
            toggleDeleteAllButton()
        }
//Coded by Prasad  :::: https://github.com/Prasad6008
