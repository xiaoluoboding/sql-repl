import os from 'os'
import jsonWebToken from 'jsonwebtoken'

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
export const isMac = os.type().toLowerCase() === 'darwin'
export const isWindows = os.type().toLowerCase() === 'windows_nt'

export const getSecretErp =  async (erp): Promise<string> => {
  return new Promise((resolve, reject) => {
    const body = { username: erp }
    const privateKey = "Ix/tr2U6jp2GkAFd9AdbRTMK8pDONxCT8BTWvaZCHxs=";
    jsonWebToken.sign(body, privateKey, { expiresIn: 3600 }, function (err, token) {
      if (err) { reject(err) }
      resolve(token)
    })
  })
}