import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAosycjHOizYZKOTkQ4j7O\n' +
  'Bcyc0k+abF7c8prGD4qsxZMyWP/iL6n+6bzu8cuOkUaH+2IYPIgMUvJXDFht2bow\n' +
  'V6MQZre3DvxkwBkal12E1ZKUNjwrUcpZdd5QqXuIM+AxOMOn5F4BCOrcsHXmbVUZ\n' +
  '0i4X+0XwxlTFbLWw+DPkspw008MQgFAz7DV3WTE6vog6qxbz3fpehmzozn/Ke5Hb\n' +
  'kjOkhclIpIAilqZsTSqXMe0cPrQkqwa2XR1ZHGyKq5wfXn/fU+/lvJ0ltfDMYUHR\n' +
  'VQLtszy8phS1/bFEwyltJJL0we45owURAxALzKb7naV7X6tQp4K/Tenm6PVyq6ds\n' +
  'JQIDAQAB'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

