import { useEffect, useState } from 'react';
import './App.scss';
import info from './info.json'

function makeSelect(ptr){
  let copy = ''
  console.log(ptr);
  copy = 'SELECT\n'
  info.info[ptr].column.forEach((columnName,index)=>{
    copy +=  index===0 ? '\t  ' : '\t, ' 
    copy += columnName
    copy += '\n'
  })
  copy += '\t, SYSDATE AS INPUT_DT\n'
  copy += '\t, \'Y\' AS IF_YN\n'
  copy += '\t, IF_DT\n'
  copy += '\t, \'정상이관\' AS IF_RES\n'
  copy += '\nFROM\n\t'
  copy += info.info[ptr].src
  copy += '\n\nWHERE 1=1\n\tAND '
  copy += info.info[ptr].condition
  
  return copy
}

function makeInsert(ptr){
  let copy = ''
  copy += `INSERT INTO ${info.info[ptr].target}\n(\n`
  info.info[ptr].column.forEach((columnName,index)=>{
    copy +=  index===0 ? '\t  ' : '\t, ' 
    copy += columnName
    copy += '\n'
  })
  copy += ')\n\nVALUES\n('
  info.info[ptr].column.forEach((columnName,index)=>{
    copy +=  index===0 ? '\t  ' : '\t, ' 
    copy += `:/MSG_DB_COLUMN_ARR_0.LIST*.${columnName}\n`
  })
  copy += '\n)'
  
  return copy
}

function makeUpdate(ptr){
  let copy = ''
  copy = `UPDATE ${info.info[ptr].src}\n`
  copy += '\nSET\n'
  copy += '\tIF_YN = :/MSG_DB_COLUMN_ARR_0.LIST*.IF_YN\n'
  copy += '\t,IF_DT = SYSDATE\n'
  copy += '\t,IF_RES = :/MSG_DB_COLUMN_ARR_0.LIST*.IF_RES\n'
  copy += '\t,IF_GUID = :/MSG_COMMON_HEADER_1.IF_GUID\n'
  copy += '\nWHERE 1=1\n'

  info.info[ptr].pk.forEach((pk_index,index)=>{
    copy +=  '\tAND '
    copy += `${info.info[ptr].column[pk_index]}=`
    copy += `:/MSG_DB_COLUMN_ARR_0.LIST*.${info.info[ptr].column[pk_index]}\n`
})
  return copy
}

function App() {
  const [ptr,setPtr] = useState(0)
  

  useEffect(()=>{
    document.querySelectorAll('.menuEl').forEach((el,index)=>{
      if(index===ptr) el.classList.add('active')
      else el.classList.remove('active')
    })
  },[ptr])

  return (
    <div className="App">
      {
        
        <div className="aboutPage" onClick={(e)=>{
          e.target.classList.toggle('active')
        }}>
        <div className="aboutBox" onClick={(e)=>{
          e.stopPropagation()
        }}>
          <div className="inner">
            <p>{info.info[ptr].name} </p>
            <textarea className="target" readOnly></textarea>
          </div>
        </div>
      </div>
      }
      {
        <div className="inner">
            <div className="menuList">
        {
            info.info.map((el,index)=>{
              return(
                <div className="menuEl" key={index} onClick={(e)=>{
                    setPtr(index)
                }}>{el.name}</div>
              )
            })
          }
          </div>
          <div className="contentBox">
            <div className="inner">
            <div className="intro">
              {
                ptr<0 ?
                <p>왼쪽에서 거래를 선택해주세요 !</p>
                  :
                  <>
                  <p>왼쪽에서 거래를 선택해주세요 !</p>
                <p>아래에서 원하는 메뉴를 선택해주세요 !</p>
                </>
              }
            </div>
            <div className="sqlList">
              {
                ['SELECT','INSERT','UPDATE'].map((el,index)=>{
                  return(
                  <div className="sqlEl"  key={index}>
                    <p className="number">0{index+1}.</p>
                    <p className='name'>{el}</p>
                    {
                      ptr>=0 && <p className="info">{info.info[ptr].name} - {el}</p>
                    }
                    {
                      ptr>=0 && <div className="btnList">
                      <button className='copy' onClick={(e)=>{
                        let copy = index === 0 ? makeSelect(ptr) : index===1 ? makeInsert(ptr) : makeUpdate(ptr)
                        document.querySelector('.target').value = copy
                        console.log(document.querySelector('.target'))
                        document.querySelector('.target').select()
                        document.execCommand('copy')
                      }}>복 사</button>
                      <button className='about' onClick={(e)=>{
                        document.querySelector('.aboutPage').classList.toggle('active')
                        let copy = index === 0 ? makeSelect(ptr) : index===1 ? makeInsert(ptr) : makeUpdate(ptr)
                        document.querySelector('.target').value = copy
                      }}>원문 보기</button>
                    </div>
                    }
                  </div>
                  )
                })
              }
          </div>
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
