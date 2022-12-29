import './App.scss';
import info from './info.json'

function App() {
  return (
    <div className="App">
      {
        <div className="inner">
            <div className="menuList">
        {
            info.info.map((el,index)=>{
              return(
                <div className="menuEl" key={index} onClick={(e)=>{
                  document.querySelectorAll('.menuEl').forEach((el)=>{
                    el.classList.remove('active')
                  })
                  e.target.classList.add('active')                                    
                }}>{el.name}</div>
              )
            })
          }
          </div>
          <div className="contentBox">
            <div className="sqlList">
              {
                [1,2,3].map((el,index)=>{
                  return(
                  <div className="sqlEl">
                    <p className="number">0{el}.</p>
                    <p className='name'>SELECT</p>
                  </div>
                  )
                })
              }
          </div>
          </div>
        </div>
      /* <div className="nav">
        <div className="inner">
          <ul className="list">
            {
              info.info.map((el,index)=>{
                return(<li key={index} onClick={(e)=>{  
                  document.querySelectorAll('li').forEach((_el,_index)=>{
                    index===_index ? _el.classList.add('active') : _el.classList.remove('active');
                  })

                  const targetSelect = document.querySelector('.targetSelect')
                  targetSelect.innerHTML = 'SELECT\n'
                  el.column.forEach((columnName,index)=>{
                    targetSelect.innerHTML +=  index===0 ? '\t  ' : '\t, ' 
                    targetSelect.innerHTML += columnName
                    targetSelect.innerHTML += '\n'
                  })
                  targetSelect.innerHTML += '\t, SYSDATE AS INPUT_DT\n'
                  targetSelect.innerHTML += '\t, \'Y\' AS IF_YN\n'
                  targetSelect.innerHTML += '\t, IF_DT\n'
                  targetSelect.innerHTML += '\t, \'정상이관\' AS IF_RES\n'
                  targetSelect.innerHTML += '\nFROM\n\t'
                  targetSelect.innerHTML += el.table
                  targetSelect.innerHTML += '\n\nWHERE 1=1\n\tAND '
                  targetSelect.innerHTML += el.condition

                  const targetInsert = document.querySelector('.targetInsert')
                  targetInsert.innerHTML = `INSERT INTO ${el.table}\n(\n`
                  el.column.forEach((columnName,index)=>{
                    targetInsert.innerHTML +=  index===0 ? '\t  ' : '\t, ' 
                    targetInsert.innerHTML += columnName
                    targetInsert.innerHTML += '\n'
                  })
                  targetInsert.innerHTML += ')\n\nVALUES\n('
                  el.column.forEach((columnName,index)=>{
                    targetInsert.innerHTML +=  index===0 ? '\t  ' : '\t, ' 
                    targetInsert.innerHTML += `:/MSG_DB_COLUMN_ARR_0.LIST*${columnName}\n`
                  })
                  targetInsert.innerHTML += '\n)'
                  
                  const targetUpdateS = document.querySelector('.targetUpdateS')
                  targetUpdateS.innerHTML = `UPDATE ${el.table}\n`
                  targetUpdateS.innerHTML += '\nSET\n'
                  targetUpdateS.innerHTML += '\tIF_YN = :/MSG_DB_COLUMN_ARR_0.LIST*.IF_YN\n'
                  targetUpdateS.innerHTML += '\t,IF_DT = SYSDATE\n'
                  targetUpdateS.innerHTML += '\t,IF_RES = :/MSG_DB_COLUMN_ARR_0.LIST*.IF_RES\n'
                  targetUpdateS.innerHTML += '\t,IF_GUID = :/MSG_COMMON_HEADER_1.IF_GUID\n'
                  targetUpdateS.innerHTML += '\nWHERE 1=1\n'

                  el.pk.forEach((pk_index,index)=>{
                    targetUpdateS.innerHTML +=  '\tAND '
                    targetUpdateS.innerHTML += `${el.column[pk_index]}=`
                    targetUpdateS.innerHTML += `:/MSG_DB_COLUMN_ARR_0.LIST*${el.column[pk_index]}\n`
                  })
                }}>{el.name}</li>)
              })
            }
          </ul>
        </div>  
      </div> 
      <div className="content">
        <div className="inner">
          <div className="targetBox">
          <textarea className="targetSelect target" value="" readOnly></textarea>
          <button className='btnCopy' onClick={(e)=>{
            const sql = document.querySelector('.targetSelect')
            sql.select()
            const alertMsg = document.querySelector('.alertMsg')
            alertMsg.style.animation = `copyMsg 1s linear forwards`
            setTimeout(() => {
              alertMsg.style.animation = null
            }, 1000);
            document.execCommand('copy')
          }}>Copy</button>
          </div>
          <div className="targetBox">
          <textarea className="targetInsert target" value="" readOnly></textarea>
          <button className='btnCopy' onClick={(e)=>{
            const sql = document.querySelector('.targetInsert')
            sql.select()
            const alertMsg = document.querySelector('.alertMsg')
            alertMsg.style.animation = `copyMsg 1s linear forwards`
            setTimeout(() => {
              alertMsg.style.animation = null
            }, 1000);
            document.execCommand('copy')
          }}>Copy</button>
          </div>
          <div className="targetBox">
          <textarea className="targetUpdateS target" value="" readOnly></textarea>
          <button className='btnCopy' onClick={(e)=>{
            const sql = document.querySelector('.targetUpdateS')
            sql.select()
            const alertMsg = document.querySelector('.alertMsg')
            alertMsg.style.animation = `copyMsg 1s linear forwards`
            setTimeout(() => {
              alertMsg.style.animation = null
            }, 1000);
            document.execCommand('copy')
          }}>Copy</button>
          </div>
          </div> 
      </div>  

      <div className='alertMsg'>복사되었습니다!</div> */}
    </div>
  );
}

export default App;
