export async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL}/products`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
        ).toString('base64')}`,
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}
