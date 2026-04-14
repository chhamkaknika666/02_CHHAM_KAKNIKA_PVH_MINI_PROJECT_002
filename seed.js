const BASE_URL = "https://homework-api.noevchanmakara.site/api/v1";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGhhbWtha25pa2ExNjg2QGdtYWlsLmNvbSIsImlhdCI6MTc3NjE3NDM3MywiZXhwIjoxNzc2MTkyMzczfQ.fBv5rQfLJBDaOfGH50vjyDMTbCIg0a1vdWMJGe1r-5c";

const categories = [
  { categoryId: 1, categoryName: "Skincare" },
  { categoryId: 2, categoryName: "Makeup" },
  { categoryId: 3, categoryName: "Fragrance" },
  { categoryId: 4, categoryName: "Haircare" },
];

const products = [
  { brand: "Glow Recipe", productName: "Watermelon Glow Toner", description: "PHA and BHA pore-tightening toner for smooth skin.", price: 34, categoryId: 1, imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600" },
  { brand: "Summer Fridays", productName: "Jet Lag Mask", description: "Hydrating cream mask for stressed skin.", price: 49, categoryId: 1, imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600" },
  { brand: "The Ordinary", productName: "Squalane Cleanser", description: "A gentle moisturizing facial cleanser.", price: 11, categoryId: 1, imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600" },
  { brand: "Laneige", productName: "Lip Sleeping Mask", description: "Overnight leave-on lip mask that soothes and moisturizes.", price: 24, categoryId: 1, imageUrl: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600" },
  { brand: "Supergoop!", productName: "Unseen Sunscreen SPF 40", description: "Totally invisible, weightless, scentless sunscreen.", price: 38, categoryId: 1, imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600" },

  { brand: "Rare Beauty", productName: "Soft Pinch Liquid Blush", description: "Weightless, long-lasting liquid blush.", price: 23, categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1625093751478-2312c3b28b3e?w=600" },
  { brand: "Fenty", productName: "Gloss Bomb Universal", description: "The ultimate gotta-have-it lip gloss with explosive shine.", price: 21, categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1583241800698-e8ab01830a63?w=600" },
  { brand: "Milk Makeup", productName: "Hydro Grip Primer", description: "Award-winning hydrating, makeup-gripping primer.", price: 38, categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600" },
  { brand: "Hourglass", productName: "Ambient Lighting Palette", description: "High-tech finishing powders for a seamless glow.", price: 69, categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600" },
  { brand: "Benefit", productName: "24-HR Brow Setter", description: "Clear brow gel that shapes and holds hairs in place.", price: 26, categoryId: 2, imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600" },

  { brand: "Le Labo", productName: "Santal 33", description: "An iconic unisex scent with cardamom, iris, and violet.", price: 215, categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600" },
  { brand: "Byredo", productName: "Gypsy Water", description: "Notes of pine needle, sandalwood, and lemon.", price: 190, categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600" },
  { brand: "Gucci", productName: "Bloom Eau de Parfum", description: "A sophisticated white floral scent.", price: 135, categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=600" },
  { brand: "Dior", productName: "Miss Dior", description: "A fresh floral fragrance with notes of rose and peony.", price: 112, categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffbb43fea44?w=600" },
  { brand: "Glossier", productName: "You Eau de Parfum", description: "The ultimate personal fragrance that smells like you.", price: 68, categoryId: 3, imageUrl: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=600" },

  { brand: "Olaplex", productName: "No. 3 Hair Perfector", description: "A treatment that reduces breakage and strengthens hair.", price: 30, categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600" },
  { brand: "Dyson", productName: "Airwrap Multi-Styler", description: "Dry, curl, and smooth without extreme heat.", price: 599, categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600" },
  { brand: "Ouai", productName: "Leave-In Conditioner", description: "Detangles and protects against heat damage.", price: 28, categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600" },
  { brand: "Living Proof", productName: "Perfect Hair Day Dry Shampoo", description: "Actually cleans hair, removing oil and sweat.", price: 28, categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600" },
  { brand: "Aveda", productName: "Scalp Solutions Serum", description: "Nightly treatment to support a balanced scalp.", price: 52, categoryId: 4, imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600" },
];

async function seed() {
  const categoryMap = {};

  console.log("Initializing categories...");
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await res.json();
    const existing = data.payload || data.data || [];
    
    for (const cat of categories) {
      let found = existing.find((c) => c.name === cat.categoryName);
      if (found) {
        categoryMap[cat.categoryId] = found.categoryId || found.id;
        console.log(`Found: ${cat.categoryName}`);
      } else {
        const createRes = await fetch(`${BASE_URL}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
          body: JSON.stringify({ name: cat.categoryName }),
        });
        const createData = await createRes.json();
        const newId = createData.payload?.categoryId || createData.id;
        categoryMap[cat.categoryId] = newId;
        console.log(`  Created: ${cat.categoryName}`);
      }
    }
  } catch (err) {
    console.error("Category sync failed:", err.message);
  }

  const limitedProducts = categories.flatMap(cat => 
    products.filter(p => p.categoryId === cat.categoryId).slice(0, 5)
  );

  console.log(`\n Seeding ${limitedProducts.length} filtered products...`);
  let success = 0;
  let failed = 0;

  for (const prod of limitedProducts) {
    const apiCatId = categoryMap[prod.categoryId];
    if (!apiCatId) continue;

    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name: prod.productName,
          description: prod.description,
          colors: ["Default"],
          sizes: ["Standard"],
          imageUrl: prod.imageUrl,
          price: prod.price,
          categoryId: apiCatId,
        }),
      });

      if (res.ok) {
        console.log(`[${prod.brand}] ${prod.productName}`);
        success++;
      } else {
        const error = await res.json();
        console.error(`[${prod.brand}] ${prod.productName}:`, error.message || error);
        failed++;
      }
    } catch (err) {
      console.error(`Network Error: ${prod.productName}`, err.message);
      failed++;
    }
  }

  console.log(`\n Finished! Success: ${success}, Failed: ${failed}`);
}

seed();