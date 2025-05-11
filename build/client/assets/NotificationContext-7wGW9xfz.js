import{r as a,j as e}from"./components-B3s0IpTW.js";import{a as C}from"./index-CDpADjvc.js";const w=a.createContext(null);function q(){const l=a.useContext(w);if(!l)throw new Error("useNotification must be used within a NotificationProvider");return l}const B=({children:l})=>{const[t,s]=a.useState(!1),[o,i]=a.useState(0),[c,p]=a.useState(""),[h,m]=a.useState(""),[u,b]=a.useState(""),[g,A]=a.useState(!1),[v,R]=a.useState(!1),[j,y]=a.useState(),f=()=>{s(!1)},d=()=>{s(!1),i(0),p("")};a.useEffect(()=>{d()},[]);let N={notify:async(n="Working...")=>{d(),b(n),await new Promise(r=>setTimeout(r,100)),s(!0),i(1)},cancel:d,alert:async(n,r)=>{d(),p(r||"Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),i(2)},alertReload:async(n,r)=>{d(),p(r||"Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),i(3)},confirm:async(n="Do you wish to continue?",r)=>{d(),p(n),await new Promise(x=>setTimeout(x,100)),s(!0),i(4),y(()=>r)},confirmCancel:g,confirmOk:v,alertCancel:async(n,r)=>{d(),p(r||"Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),i(5)}};return e.jsxs(w.Provider,{value:N,children:[t&&o===1&&e.jsx(S,{working:t,notifyMessage:u}),t&&o===2&&e.jsx(P,{handleClose:f,working:t,message:c,title:h}),t&&o===3&&e.jsx(M,{handleClose:f,working:t,title:h,message:c}),t&&o===4&&e.jsx(k,{onClose:j,working:t,message:c}),t&&o===5&&e.jsx(T,{handleClose:f,working:t,message:c,title:h}),l]})},k=({handleClose:l,working:t,message:s,handleConfirmCancel:o,setConfirmOk:i,onClose:c})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:"Confirm"}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onClick:()=>c(!1),className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Cancel"}),e.jsx("button",{onClick:()=>c(!0),className:`px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,children:"Continue"})]})]})}),S=({working:l,notifyMessage:t})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:"Processing..."}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsxs("div",{className:` px-3 py-3 h-fit
                        flex place-items-center gap-2`,children:[e.jsx(C,{className:`text-3xl text-blue-500 ${l?"animate-spin":""}`}),t]})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:" "})]})}),P=({handleClose:l,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onMouseDown:l,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"}),e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})]})]})}),M=({handleClose:l,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})})]})}),T=({handleClose:l,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:l,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"})})]})});export{B as N,q as u};
