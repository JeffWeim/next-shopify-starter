const { URL } = require('url')
const { createClient } = require('@commercetools/sdk-client')

// eslint-disable-next-line
const shopify = new createClient({
  store_name: process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME,
  client_key: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  client_pass: process.env.NEXT_PUBLIC_SHOPIFY_API_PASS,
})

module.exports = async (req, res) => {
  const { searchParams } = new URL(
    req.url,
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME}.myshopify.com`,
  )
  const variantBase = searchParams.get('variantId')
  const variantUri = Buffer.from(variantBase, 'base64').toString('ascii')
  const variantId = variantUri.split('/').pop()
  const { variant } = await shopify.get(`/admin/variants/${variantId}.json`)

  if (variant.inventory_management === null) {
    res.end(JSON.stringify(0))
  }

  const variantInventory = variant.inventory_quantity
  const leadTime = variantInventory > 0 ? 10 : 20

  res.end(JSON.stringify({ leadTime, quantity: variantInventory }))
}
