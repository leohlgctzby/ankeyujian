
// 用户主界面
//   nvshen：/nvshen
//   nanshen：/nanshen 
// 用户信息完善界面
//   nvshen：/nvsheninfo
//   nanshen：/nansheninfo
//  判断是否已经完善信息？user.header是否有值
//  判断用户类型：user.type
export function getRedirectTo(type, header) {
  let path = ''
  if(type==='nanshen') {
    path = 'nanshen'
  } else {
    path = 'nvshen'
  }

  if(!header) {
    path += 'info'
  } 

  return path
}