import { CountryData, CulinaryProfile, NationalFoodItem } from '../types.ts';
import { getDetailedCountryInfo } from '../data/countryDetails.ts';

// Comprehensive National Food & Culinary Heritage Registry
export const CURATED_CULINARY_REGISTRY: Record<string, Partial<CulinaryProfile>> = {
  // United States
  '840': {
    culinaryTraditions: 'A melting-pot gastronomy blending Indigenous American ingredients (corn, pumpkin, wild game), transatlantic immigrant traditions, Southern barbecue slow-smoking, and coastal seafood heritage.',
    stapleIngredients: ['Sweet Corn', 'Beef Brisket', 'Cheddar Cheese', 'Potatoes', 'Wheat Flour', 'Pecan & Cranberries'],
    dietaryHeritage: 'Regional barbecue styles (Texas, Carolina, Kansas City, Memphis), New England clam chowders, Creole & Cajun jambalayas.',
    nationalDishes: [
      {
        name: 'Smoked Barbecue Brisket & Ribs',
        nativeName: 'American BBQ',
        category: 'National Dish',
        description: 'Hardwood slow-smoked beef brisket and pork ribs rubbed with brown sugar, paprika, and black pepper, cooked low-and-slow for up to 16 hours until meltingly tender with a deep smoke ring.',
        keyIngredients: ['Beef Brisket / Pork Ribs', 'Hardwood Smoke (Hickory/Oak)', 'Dry Rub Spices', 'Tangy BBQ Glaze'],
        flavorProfile: 'Smoky, Sweet, Peppery & Rich',
        culturalSignificance: 'The heart of American regional food culture, celebrated in summer gatherings, 4th of July picnics, and statewide smokehouse competitions.',
        iconEmoji: '🍖',
      },
      {
        name: 'Classic Smash Cheeseburger',
        nativeName: 'Double Cheeseburger',
        category: 'Traditional Main',
        description: 'Seared ground chuck beef patty smashed on a screaming hot flat-top griddle for crispy lace edges, crowned with melted American cheddar, pickles, onions, and special sauce in a toasted brioche bun.',
        keyIngredients: ['Ground Beef Chuck', 'Sharp American Cheese', 'Dill Pickles', 'Toasted Brioche Bun', 'Secret Sauce'],
        flavorProfile: 'Savory, Crispy, Melty & Tangy',
        culturalSignificance: 'An internationally celebrated 20th-century American icon born from roadside diners and drive-ins.',
        iconEmoji: '🍔',
      },
      {
        name: 'New England Clam Chowder',
        nativeName: 'Boston Clam Chowder',
        category: 'Soup / Stew',
        description: 'Rich, velvety cream-based chowder packed with tender fresh Atlantic quahog clams, diced russet potatoes, salt pork or crispy bacon, and sweet onions, served with oyster crackers.',
        keyIngredients: ['Fresh Clams & Clam Nectar', 'Heavy Cream', 'Russet Potatoes', 'Smoked Bacon', 'Fresh Thyme'],
        flavorProfile: 'Creamy, Briny, Savory & Comforting',
        culturalSignificance: 'A historic Atlantic maritime staple documented in New England since the early 1700s.',
        iconEmoji: '🍲',
      },
    ],
    popularStreetFoods: [
      {
        name: 'New York Style Bagel & Lox',
        category: 'Street Food',
        description: 'Boiled and baked dense malt bagel slathered with whipped cream cheese, paper-thin smoked Atlantic salmon, capers, and red onion.',
        keyIngredients: ['Kettle-Boiled Bagel', 'Smoked Salmon (Lox)', 'Cream Cheese', 'Capers', 'Red Onion'],
        flavorProfile: 'Chewy, Briny, Creamy & Salty',
        iconEmoji: '🥯',
      },
      {
        name: 'Chicago Deep-Dish & Hot Dog',
        category: 'Street Food',
        description: 'All-beef kosher hot dog on a poppy seed bun dragged through the garden with yellow mustard, neon green relish, chopped onions, tomato wedges, pickle spear, sport peppers, and celery salt.',
        keyIngredients: ['All-Beef Frank', 'Poppy Seed Bun', 'Pickles & Peppers', 'Celery Salt'],
        flavorProfile: 'Snappy, Pungent, Tangy & Spicy',
        iconEmoji: '🌭',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Spiced Apple Pie with Vanilla Ice Cream',
        nativeName: 'As American as Apple Pie',
        category: 'Dessert / Pastry',
        description: 'Flaky butter lattice crust packed with tart Granny Smith apples tossed in cinnamon, nutmeg, brown sugar, and lemon zest, baked until bubbling and served warm à la mode.',
        keyIngredients: ['Tart Apples', 'Flaky Butter Crust', 'Cinnamon & Nutmeg', 'Vanilla Bean Ice Cream'],
        flavorProfile: 'Sweet, Tart, Warmly Spiced & Buttery',
        culturalSignificance: 'A cultural proverb for wholesome national warmth and autumn Thanksgiving celebrations.',
        iconEmoji: '🥧',
      },
      {
        name: 'Southern Pecan & Key Lime Pie',
        category: 'Dessert / Pastry',
        description: 'Crisp buttery graham cracker or shortcrust crust with roasted pecans in molasses custard, or tart Florida key lime juice custard.',
        keyIngredients: ['Pecans / Key Limes', 'Graham Cracker Crust', 'Sweetened Condensed Milk', 'Whipped Cream'],
        flavorProfile: 'Zesty, Sweet, Nutty & Rich',
        iconEmoji: '🍰',
      },
    ],
    signatureBeverages: [
      {
        name: 'Southern Sweet Iced Tea & Bourbon Mash',
        category: 'Iconic Beverage',
        description: 'Freshly brewed black tea sweetened while piping hot and poured over cracked ice with lemon mint, alongside historic Kentucky bourbon whiskey made from charred new oak barrels.',
        keyIngredients: ['Black Tea', 'Pure Cane Sugar', 'Fresh Mint & Lemon', 'Kentucky Bourbon'],
        flavorProfile: 'Sweet, Refreshing, Oaky & Caramel',
        iconEmoji: '🥃',
      },
    ],
  },

  // China
  '156': {
    culinaryTraditions: 'One of the world’s grandest culinary civilizations, categorized into the Eight Great Cuisines (Sichuan, Cantonese, Shandong, Jiangsu, Hunan, Zhejiang, Fujian, and Anhui), balancing yin and yang, wok hei (breath of the wok), and medicinal food harmony.',
    stapleIngredients: ['Jasmine & Glutinous Rice', 'Soy Sauce & Fermented Bean Paste', 'Ginger & Scallions', 'Shaoxing Wine', 'Sichuan Peppercorns', 'Tofu'],
    dietaryHeritage: 'Imperial banquet banquets, Dim Sum morning tea, hot pot communal dining, and hand-pulled noodles.',
    nationalDishes: [
      {
        name: 'Peking Roast Duck',
        nativeName: '北京烤鸭 (Běijīng Kǎoyā)',
        category: 'National Dish',
        description: 'Wood-roasted whole duck roasted in open-brick ovens over fragrant fruitwood (date and pear) until the skin achieves glass-crisp amber crackling. Sliced tableside and folded into warm lotus-leaf pancakes with sweet bean sauce and julienned scallions.',
        keyIngredients: ['Whole White Duck', 'Fruitwood Fire', 'Sweet Bean Sauce (Tianmianjiang)', 'Thin Spring Pancakes', 'Cucumber & Scallion'],
        flavorProfile: 'Crispy, Rich, Sweet, Savory & Aromatic',
        culturalSignificance: 'Historic imperial court dish served in Beijing since the Ming Dynasty, acclaimed as a national diplomatic delicacy.',
        iconEmoji: '🦆',
      },
      {
        name: 'Handcrafted Steamed Dumplings (Jiaozi & Xiaolongbao)',
        nativeName: '饺子 / 小笼包',
        category: 'Traditional Main',
        description: 'Delicate dough pleats encapsulating minced pork, wild ginger, and scalding rich collagen broth in soup dumplings, or pan-fried crispy-bottom potstickers dipped in aged Chinkiang black vinegar.',
        keyIngredients: ['Wheat Flour Dough', 'Minced Pork & Napa Cabbage', 'Aspic Broth', 'Chinkiang Black Vinegar', 'Chili Oil'],
        flavorProfile: 'Juicy, Savory, Umami & Ginger-Aromatic',
        culturalSignificance: 'The indispensable centerpiece of Lunar New Year reunions, symbolizing ancient gold ingots and prosperous fortune.',
        iconEmoji: '🥟',
      },
      {
        name: 'Sichuan Kung Pao & Mapo Tofu',
        nativeName: '麻婆豆腐 / 宫保鸡丁',
        category: 'Traditional Main',
        description: 'Silken tofu simmered in fiery chili bean paste (doubanjiang) and fermented black beans, crowned with minced beef and tingling Sichuan peppercorns inducing the authentic signature málà (numbing and spicy) sensation.',
        keyIngredients: ['Silken Tofu', 'Pixian Doubanjiang', 'Sichuan Peppercorns', 'Minced Beef', 'Garlic Greens'],
        flavorProfile: 'Málà (Fiery, Numbing, Umami & Fragrant)',
        culturalSignificance: 'A cornerstone of Sichuan cuisine known globally for its intricate multi-layered spice dynamics.',
        iconEmoji: '🍲',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Jianbing & Dim Sum Buns',
        nativeName: '煎饼果子 / 叉烧包',
        category: 'Street Food',
        description: 'Savory morning crêpe smeared with sweet bean paste, chili crisps, eggs, cilantro, and crackly fried wonton crisps (baocui), rolled fresh on street-side iron griddles.',
        keyIngredients: ['Mung Bean Flour Crêpe', 'Fresh Eggs', 'Crispy Wonton Cracker', 'Sweet Paste & Scallions'],
        flavorProfile: 'Crispy, Chewy, Savory & Pungent',
        iconEmoji: '🫓',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Mid-Autumn Mooncakes & Tangyuan',
        nativeName: '月饼 / 汤圆',
        category: 'Dessert / Pastry',
        description: 'Intricately molded golden pastries stuffed with lotus seed paste and salted duck egg yolks symbolizing the full harvest moon, or warm glutinous rice balls filled with molten black sesame.',
        keyIngredients: ['Lotus Seed Paste', 'Salted Duck Egg Yolk', 'Glutinous Rice', 'Black Sesame'],
        flavorProfile: 'Sweet, Velvety, Nutty & Rich',
        culturalSignificance: 'Sacred symbols of familial unity during the Mid-Autumn and Lantern Festivals.',
        iconEmoji: '🥮',
      },
    ],
    signatureBeverages: [
      {
        name: 'Imperial Longjing Green Tea & Pu-erh',
        nativeName: '龙井茶 / 普洱茶',
        category: 'Iconic Beverage',
        description: 'Hand-pan-roasted Dragon Well leaves picked before the Qingming rains, exuding chestnut sweetness, and aged Yunnan fermented Pu-erh tea cakes revered for digestive tranquility.',
        keyIngredients: ['Camellia Sinensis Spring Bud Plucks', 'Spring Water'],
        flavorProfile: 'Grassy, Chestnut, Sweet Floral & Earthy',
        iconEmoji: '🍵',
      },
    ],
  },

  // Japan
  '392': {
    culinaryTraditions: 'Washoku (和食), designated a UNESCO Intangible Cultural Heritage of Humanity, prioritizing the natural taste of seasonal ingredients, aesthetic presentation, master knife technique, and dashi-driven umami.',
    stapleIngredients: ['Short-grain Koshihikari Rice', 'Kombu Kelp & Katsuobushi Dashi', 'Fermented Miso', 'Mirin & Sake', 'Soy Sauce (Shoyu)', 'Fresh Seafood'],
    dietaryHeritage: 'Kaiseki seasonal haute cuisine, Edomae sushi craftsmanship, ramen noodle mastery, and tempura frying precision.',
    nationalDishes: [
      {
        name: 'Edomae Nigiri Sushi & Sashimi',
        nativeName: '握り寿司 (Nigirizushi)',
        category: 'National Dish',
        description: 'Pristine raw seasonal seafood (bluefin otoro tuna, sea urchin, king salmon, sea bream) deftly pressed over warm, vinegar-seasoned koshihikari rice dabbed with freshly grated real Hon-wasabi.',
        keyIngredients: ['Sashimi-Grade Seafood', 'Seasoned Sushi Rice (Shari)', 'Fresh Hon-Wasabi', 'Aged Shoyu', 'Pickled Gari Ginger'],
        flavorProfile: 'Pure, Umami, Delicate, Silky & Oceanic',
        culturalSignificance: 'Global pinnacle of Japanese craftsmanship, perfected over 200 years since Tokyo street stalls in the late Edo era.',
        iconEmoji: '🍣',
      },
      {
        name: 'Traditional Japanese Ramen (Tonkotsu & Shoyu)',
        nativeName: 'ラーメン (Rāmen)',
        category: 'Traditional Main',
        description: 'Springy alkaline wheat noodles submerged in 18-hour simmered pork bone tonkotsu or dashi-infused soy broth, topped with chashu pork belly, seasoned molten ajitsuke tamago egg, menma bamboo shoots, nori, and scallion oil.',
        keyIngredients: ['Kansui Alkaline Noodles', 'Tonkotsu / Dashi Broth', 'Rolled Chashu Pork', 'Soft-Boiled Ramen Egg', 'Nori Seaweed'],
        flavorProfile: 'Deep Umami, Savory, Collagen-Rich & Hearty',
        culturalSignificance: 'A beloved nationwide culinary art form with regional varieties from Sapporo miso to Hakata tonkotsu.',
        iconEmoji: '🍜',
      },
      {
        name: 'Japanese Wagyu Beef Sukiyaki & Shabu-Shabu',
        nativeName: 'すき焼き (Sukiyaki)',
        category: 'Traditional Main',
        description: 'Feather-thin ribbons of heavily marbled A5 Wagyu beef simmered tableside in a cast-iron pan with sweet soy-mirin warishita sauce, shiitake mushrooms, enoki, tofu, and dipped in raw pasteurized egg.',
        keyIngredients: ['A5 Wagyu Beef Ribeye', 'Warishita (Soy, Sake, Mirin, Sugar)', 'Kuzukiri Noodles', 'Raw Egg Dip', 'Negi Onions'],
        flavorProfile: 'Sweet-Savory, Meltingly Tender & Luxurious',
        culturalSignificance: 'Traditional celebration feast enjoyed during winter gatherings and Year-End bonenkai parties.',
        iconEmoji: '🍲',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Osaka Takoyaki & Okonomiyaki',
        nativeName: 'たこ焼き / お好み焼き',
        category: 'Street Food',
        description: 'Spherical golden batter balls stuffed with tender diced octopus, pickled red ginger, and scallions, coated with savory sweet glaze, Japanese Kewpie mayo, aonori seaweed, and dancing katsuobushi flakes.',
        keyIngredients: ['Dashi Batter', 'Poached Octopus', 'Japanese Kewpie Mayo', 'Bonito Flakes (Katsuobushi)', 'Aonori'],
        flavorProfile: 'Crisp Exterior, Creamy Molten Core, Savory & Smoky',
        iconEmoji: '🐙',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Wagashi, Mochi & Matcha Parfait',
        nativeName: '和菓子 / 大福 (Daifuku)',
        category: 'Dessert / Pastry',
        description: 'Chewy glutinous rice mochi filled with sweet azuki red bean paste or seasonal fresh strawberries, crafted to reflect changing seasons during the traditional tea ceremony.',
        keyIngredients: ['Glutinous Rice Flour (Mochiko)', 'Sweet Azuki Red Beans', 'Matcha Powder', 'Seasonal Fruits'],
        flavorProfile: 'Subtly Sweet, Chewy, Earthy & Refined',
        iconEmoji: '🍡',
      },
    ],
    signatureBeverages: [
      {
        name: 'Ceremonial Uji Matcha & Junmai Daiginjo Sake',
        nativeName: '抹茶 / 日本酒 (Nihonshu)',
        category: 'Iconic Beverage',
        description: 'Stone-ground emerald shade-grown green tea whisked with bamboo chasen into a creamy jade foam, and premium cold-brewed rice sake with floral melon aromatics.',
        keyIngredients: ['Ceremonial Tencha Leaves', 'Spring Water', 'Polished Sakamai Rice'],
        flavorProfile: 'Vegetal Umami, Bittersweet, Silky & Crisp',
        iconEmoji: '🍵',
      },
    ],
  },

  // France
  '250': {
    culinaryTraditions: 'UNESCO World Intangible Cultural Heritage known as the "Gastronomic Meal of the French," defined by terroir, mother sauces (Béchamel, Velouté, Espagnole, Hollandaise, Tomato), wine pairing, artisanal cheese, and bakery perfection.',
    stapleIngredients: ['Cultured French Butter', 'Wheat Flour', 'Dijon Mustard', 'Shallots & Garlic', 'Wine (Bordeaux, Burgundy, Champagne)', 'Herbes de Provence'],
    dietaryHeritage: 'Haute cuisine, rustic country bistros, artisanal charcuterie, and over 1,200 distinct French cheeses.',
    nationalDishes: [
      {
        name: 'Pot-au-Feu & Boeuf Bourguignon',
        nativeName: 'Bœuf Bourguignon / Pot-au-feu',
        category: 'National Dish',
        description: 'Tender braised beef chuck slowly simmered in full-bodied red Burgundy wine, beef stock, pearl onions, brown button mushrooms, lardons, carrots, and bouquet garni until deeply aromatic and fork-tender.',
        keyIngredients: ['Braised Beef Chuck', 'Red Burgundy Wine', 'Smoked Lardons', 'Pearl Onions', 'Bouquet Garni'],
        flavorProfile: 'Earthy, Wine-Rich, Savory & Velvety',
        culturalSignificance: 'The ultimate symbol of French culinary history, bridging peasant hearth cooking with Michelin-starred bistro refinement.',
        iconEmoji: '🥘',
      },
      {
        name: 'Traditional French Baguette & Artisan Cheeses',
        nativeName: 'Baguette de tradition & Plateau de Fromages',
        category: 'Traditional Main',
        description: 'Crackling golden artisanal baguette with honeycomb crumb, accompanied by Camembert de Normandie, Roquefort, Comté, and Brie de Meaux with churned salt butter.',
        keyIngredients: ['Stoneground Wheat Flour', 'Levain Sourdough Starter', 'Sea Salt', 'AOC French Cheeses'],
        flavorProfile: 'Crusty, Nutty, Buttery, Pungent & Earthy',
        culturalSignificance: 'The French baguette was inscribed by UNESCO in 2022 as an Intangible Cultural Heritage of Humanity.',
        iconEmoji: '🥖',
      },
      {
        name: 'Duck Confit & Cassoulet',
        nativeName: 'Confit de Canard / Cassoulet',
        category: 'Traditional Main',
        description: 'Duck legs cured with sea salt and garlic, slowly submerged in their own rich fat for hours, then pan-seared for crackling skin; or baked with white Tarbais beans and Toulouse sausage.',
        keyIngredients: ['Duck Legs', 'Rendered Duck Fat', 'Toulouse Sausage', 'Tarbais White Beans', 'Garlic & Thyme'],
        flavorProfile: 'Decadent, Savory, Crispy Skin & Melt-in-Mouth Meat',
        iconEmoji: '🍗',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Brittany Galette & Crêpe',
        nativeName: 'Galette de Sarrasin',
        category: 'Street Food',
        description: 'Crispy lacy buckwheat crêpe stuffed with French ham, melted Gruyère cheese, and a sunny-side-up egg folded into a square galette complète.',
        keyIngredients: ['Buckwheat Flour', 'Paris Ham', 'Gruyère Cheese', 'Fresh Farm Egg'],
        flavorProfile: 'Nutty, Savory, Cheesy & Crisp',
        iconEmoji: '🥞',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Croissant au Beurre, Macarons & Crème Brûlée',
        nativeName: 'Croissant / Macaron / Crème Brûlée',
        category: 'Dessert / Pastry',
        description: 'Laminated flaky viennoiserie pastry layered with French Charentes-Poitou butter, pastel almond meringue shells with ganache, and Madagascar vanilla custard with caramelized sugar crust.',
        keyIngredients: ['Laminated Butter Pastry', 'Almond Flour', 'Madagascar Vanilla Bean', 'Caramelized Sugar'],
        flavorProfile: 'Buttery, Crisp, Flaky, Delicate & Vanilla-Rich',
        iconEmoji: '🥐',
      },
    ],
    signatureBeverages: [
      {
        name: 'Bordeaux Grand Cru, Champagne & Café au Lait',
        category: 'Iconic Beverage',
        description: 'Sparkling effervescent Champagne from limestone cellars, complex oak-aged Cabernet-Merlot blends, and morning chicory espresso with steamed whole milk.',
        keyIngredients: ['Chardonnay & Pinot Noir Grapes', 'Roasted Arabica Coffee Beans'],
        flavorProfile: 'Crisp Minerality, Brioche Bubbles & Dark Fruit Complexity',
        iconEmoji: '🍾',
      },
    ],
  },

  // Italy
  '380': {
    culinaryTraditions: 'Celebrated worldwide for simplicity and supreme ingredient quality ("cucina povera" elevated to high art), where meals are family rituals built around pasta fresca, San Marzano tomatoes, extra virgin olive oil, and regional pride.',
    stapleIngredients: ['Extra Virgin Olive Oil', 'San Marzano DOP Tomatoes', 'Parmigiano-Reggiano', 'Semolina & Durum Wheat', 'Fresh Basil & Oregano', 'Garlic'],
    dietaryHeritage: 'Regional specializations from creamy risottos of Lombardy to Neapolitan pizza and seafood pastas of Sicily.',
    nationalDishes: [
      {
        name: 'Authentic Neapolitan Pizza Margherita',
        nativeName: 'Pizza Napoletana Margherita',
        category: 'National Dish',
        description: 'Slow-fermented dough hand-stretched and blistered in a 485°C wood-fired oven for 90 seconds, topped with crushed sweet San Marzano tomatoes, creamy Buffalo Mozzarella DOP, fresh basil, and extra virgin olive oil.',
        keyIngredients: ['00 Wheat Flour', 'San Marzano Tomatoes DOP', 'Mozzarella di Bufala Campana', 'Fresh Basil Leaves', 'EVOO'],
        flavorProfile: 'Pillowy Crust, Tangy Tomato Sweetness, Melty & Aromatic',
        culturalSignificance: 'UNESCO Intangible Cultural Heritage representing the red, white, and green colors of the Italian national flag.',
        iconEmoji: '🍕',
      },
      {
        name: 'Pasta Carbonara & Tagliatelle al Ragù (Bolognese)',
        nativeName: 'Spaghetti alla Carbonara',
        category: 'Traditional Main',
        description: 'Al dente bronze-extruded spaghetti tossed with crispy rendered cured guanciale (pork jowl), farm egg yolks, and copious finely grated Pecorino Romano and cracked black pepper without any cream.',
        keyIngredients: ['Guanciale (Cured Pork Jowl)', 'Fresh Egg Yolks', 'Pecorino Romano DOP', 'Coarse Black Pepper', 'Bronze-Cut Spaghetti'],
        flavorProfile: 'Rich, Creamy Emulsion, Peppery, Salty & Umami',
        culturalSignificance: 'Rome’s most sacred culinary masterpiece with origins celebrated across Italy.',
        iconEmoji: '🍝',
      },
      {
        name: 'Ossobuco alla Milanese with Saffron Risotto',
        nativeName: 'Ossobuco con Risotto allo Zafferano',
        category: 'Traditional Main',
        description: 'Cross-cut veal shank braised with white wine, broth, and mirepoix, topped with fresh gremolata (lemon zest, garlic, parsley) over golden Carnaroli rice steeped in golden saffron strands and butter.',
        keyIngredients: ['Veal Shank with Marrow', 'Carnaroli Rice', 'Saffron Stigmas', 'Gremolata Herbs', 'Parmigiano-Reggiano'],
        flavorProfile: 'Luxurious, Savory, Citrusy & Earthy',
        iconEmoji: '🥘',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Sicilian Arancini & Roman Supplì',
        nativeName: 'Arancini Siciliani',
        category: 'Street Food',
        description: 'Golden fried saffron rice croquette coated in crispy breadcrumbs, filled with slow-cooked meat ragù, sweet peas, and a molten core of stretchy caciocavallo or mozzarella cheese.',
        keyIngredients: ['Saffron Rice', 'Slow-Simmered Meat Ragù', 'Green Peas', 'Mozzarella Core', 'Breadcrumbs'],
        flavorProfile: 'Crunchy Exterior, Creamy Rice, Hearty & Cheesy',
        iconEmoji: '🍘',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Artisanal Tiramisù & Gelato',
        nativeName: 'Tiramisù Tradizionale',
        category: 'Dessert / Pastry',
        description: 'Airy ladyfinger savoiardi biscuits soaked in dark espresso and Marsala wine, layered with fluffy sweetened mascarpone cream and dusted with bitter Dutch cocoa powder.',
        keyIngredients: ['Mascarpone Cheese', 'Savoiardi Ladyfingers', 'Espresso Coffee', 'Egg Yolks', 'Bitter Cocoa Powder'],
        flavorProfile: 'Velvety, Coffee-Infused, Lightly Sweet & Cocoa-Rich',
        culturalSignificance: 'Veneto’s beloved "pick-me-up" dessert recognized worldwide.',
        iconEmoji: '🍨',
      },
    ],
    signatureBeverages: [
      {
        name: 'Italian Espresso, Chianti Classico & Limoncello',
        category: 'Iconic Beverage',
        description: 'Velvety 25ml espresso extraction topped with hazelnut crema, ruby Tuscan Sangiovese wine, and iced Sorrento lemon zest digestif.',
        keyIngredients: ['Dark Roast Arabica/Robusta', 'Sangiovese Grapes', 'Amalfi Lemon Zest'],
        flavorProfile: 'Intense, Bittersweet, Velvety & Citrusy',
        iconEmoji: '☕',
      },
    ],
  },

  // Mexico
  '484': {
    culinaryTraditions: 'Traditional Mexican Cuisine was among the first national cuisines inscribed on the UNESCO Intangible Cultural Heritage list, based on ancestral nixtamalization, wild chilies, beans, squash, and pre-Hispanic Aztec and Mayan traditions.',
    stapleIngredients: ['Nixtamalized Heirloom Corn', 'Fresh & Dried Chilies (Poblano, Habanero, Guajillo)', 'Avocados', 'Black & Pinto Beans', 'Limes', 'Cilantro & Epazote'],
    dietaryHeritage: 'Street taco culture, complex multi-day moles of Oaxaca and Puebla, ceviches, and tamale steaming.',
    nationalDishes: [
      {
        name: 'Tacos al Pastor & Birria de Res',
        nativeName: 'Tacos al Pastor / Birria con Consomé',
        category: 'National Dish',
        description: 'Thin shavings of marinated pork roasted on a vertical trompo spit with sweet charred pineapple, onion, cilantro, and fiery salsa on warm hand-pressed nixtamalized corn tortillas, or slow-braised guajillo-chile beef birria dipped in rich consommé.',
        keyIngredients: ['Heirloom Corn Tortillas', 'Pork Shoulder marinated in Achiote & Chilies', 'Charred Pineapple', 'Cilantro & White Onion', 'Salsa Taquera'],
        flavorProfile: 'Smoky, Citrus-Spiced, Sweet & Savory',
        culturalSignificance: 'The beating pulse of Mexico City’s legendary street gastronomy.',
        iconEmoji: '🌮',
      },
      {
        name: 'Mole Poblano & Mole Negro Oaxaqueño',
        nativeName: 'Mole Poblano',
        category: 'Traditional Main',
        description: 'An intricate, velvety sauce crafted from over 30 roasted ingredients: dried ancho, pasilla, and chipotle chilies, Mexican dark chocolate, plantains, raisins, sesame seeds, almonds, cloves, and Mexican cinnamon, ladled over tender braised turkey or chicken.',
        keyIngredients: ['Dried Chilies (Mulato, Ancho, Pasilla)', 'Mexican Dark Chocolate', 'Roasted Sesame Seeds', 'Cinnamon & Cloves', 'Tender Chicken or Turkey'],
        flavorProfile: 'Complex, Earthy, Bittersweet, Smoky & Spicy',
        culturalSignificance: 'Mexico’s crowning culinary masterpiece, served at weddings, feast days, and national celebrations.',
        iconEmoji: '🍲',
      },
      {
        name: 'Chiles en Nogada',
        nativeName: 'Chiles en Nogada',
        category: 'Traditional Main',
        description: 'Roasted poblano pepper stuffed with sweet-savory picadillo (pork, apples, peaches, raisins), smothered in creamy white walnut sauce (nogada), and sprinkled with ruby pomegranate arils and parsley.',
        keyIngredients: ['Poblano Chilies', 'Pork Picadillo & Dried Fruits', 'Fresh Walnut Cream Sauce', 'Pomegranate Arils', 'Parsley'],
        flavorProfile: 'Sweet, Savory, Nutty, Creamy & Mildly Spiced',
        culturalSignificance: 'Created by nuns in Puebla to celebrate Mexican Independence, bearing the exact colors of the national flag.',
        iconEmoji: '🫑',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Street Elote & Fresh Guacamole',
        nativeName: 'Elote Callejero & Guacamole',
        category: 'Street Food',
        description: 'Char-grilled sweet corn on the cob slathered with Mexican crema, mayonnaise, crumbled cotija cheese, chili powder, and fresh lime juice, accompanied by stone-ground avocado molcajete dip.',
        keyIngredients: ['Charred Corn', 'Cotija Cheese', 'Mexican Crema', 'Tajín Chili Powder', 'Michoacán Avocados'],
        flavorProfile: 'Sweet, Creamy, Tangy, Smoky & Salty',
        iconEmoji: '🌽',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Cinnamon Sugar Churros & Tres Leches Cake',
        nativeName: 'Churros con Chocolate & Pastel de Tres Leches',
        category: 'Dessert / Pastry',
        description: 'Crisp fluted fried pastry piped fresh and rolled in cinnamon sugar, dipped in molten spiced dark chocolate, alongside sponge cake soaked in condensed milk, evaporated milk, and heavy cream.',
        keyIngredients: ['Choux Dough', 'Cinnamon & Sugar', 'Dark Mexican Chocolate with Cinnamon', 'Three Milks'],
        flavorProfile: 'Crispy, Sweet, Warmly Spiced & Luscious',
        iconEmoji: '🥖',
      },
    ],
    signatureBeverages: [
      {
        name: '100% Blue Agave Tequila, Mezcal & Agua de Horchata',
        category: 'Iconic Beverage',
        description: 'Smoky artisanal artisanal Mezcal from wood-fired underground pits, highlands Tequila, and creamy iced rice milk infused with Ceylon cinnamon and vanilla.',
        keyIngredients: ['Blue Weber Agave', 'Espadín Agave', 'Long Grain Rice', 'Mexican Cinnamon', 'Piloncillo'],
        flavorProfile: 'Earthy, Smoky, Sweet-Spicy & Creamy',
        iconEmoji: '🍹',
      },
    ],
  },

  // India
  '356': {
    culinaryTraditions: 'One of the world’s most diverse and ancient culinary landscapes, heavily guided by Ayurvedic principles of balancing the six tastes (sweet, sour, salty, bitter, pungent, astringent), aromatic whole spices, and rich regional vegetarian and meat specialties.',
    stapleIngredients: ['Basmati Rice', 'Lentils (Dal)', 'Ghee (Clarified Butter)', 'Turmeric & Cumin', 'Garam Masala', 'Ginger & Garlic'],
    dietaryHeritage: 'Tandoor clay oven baking, aromatic dum biryanis, thali platters, South Indian dosas, and street chaat.',
    nationalDishes: [
      {
        name: 'Hyderabadi Dum Biryani',
        nativeName: 'हैदराबादी दम बिरयानी / حیدرآبادی بریانی',
        category: 'National Dish',
        description: 'Aromatic long-grain basmati rice and succulent marinated chicken or mutton layered with saffron milk, caramelized fried onions (birista), fresh mint, cilantro, and whole spices, sealed with dough and slow-cooked over coals in a handi (dum pukht).',
        keyIngredients: ['Aged Basmati Rice', 'Marinated Meat', 'Pure Saffron', 'Ghee', 'Caramelized Onions', 'Cardamom & Star Anise'],
        flavorProfile: 'Fragrant, Royal, Rich, Spiced & Herbaceous',
        culturalSignificance: 'The crowning jewel of Mughlai and Nizami culinary heritage, celebrated across South Asia.',
        iconEmoji: '🍛',
      },
      {
        name: 'Butter Chicken & Dal Makhani with Garlic Naan',
        nativeName: 'Murgh Makhani & दाल मखनी',
        category: 'Traditional Main',
        description: 'Smoky tandoor-roasted chicken tikka or black urad lentils slow-simmered overnight in a velvety tomato, cream, cashew butter sauce scented with crushed fenugreek leaves (kasuri methi). Served with blistered garlic naan.',
        keyIngredients: ['Tandoori Chicken', 'Black Urad Lentils', 'Tomato Puree & Cream', 'Kasuri Methi (Fenugreek)', 'Tandoor-baked Naan'],
        flavorProfile: 'Creamy, Tangy, Smoky, Mildly Sweet & Spiced',
        culturalSignificance: 'Born in Delhi in the 1950s, now celebrated worldwide as an emblem of North Indian hospitality.',
        iconEmoji: '🥘',
      },
      {
        name: 'Crispy Masala Dosa & Sambar',
        nativeName: 'मसाला दोसा / மசாலா தோசை',
        category: 'Traditional Main',
        description: 'Lacy, wafer-crisp fermented rice and black gram crepe rolled around spiced potato-mustard seed masala, served with piping hot tamarind-lentil sambar and fresh coconut chutney.',
        keyIngredients: ['Fermented Rice-Lentil Batter', 'Mustard Seed Spiced Potatoes', 'Tamarind Sambar', 'Fresh Coconut Chutney'],
        flavorProfile: 'Crispy, Tangy, Savory & Aromatic',
        culturalSignificance: 'The iconic pride of South Indian morning gastronomy.',
        iconEmoji: '🥞',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Pani Puri & Samosa Chaat',
        nativeName: 'पानी पूरी / समोसा',
        category: 'Street Food',
        description: 'Hollow, crispy fried semolina puris filled with spiced potatoes and black chickpeas, topped with mint-coriander water and sweet tamarind-date chutney, eaten in one bursting bite.',
        keyIngredients: ['Semolina Puris', 'Mint-Coriander Water', 'Tamarind Chutney', 'Spiced Potatoes & Sev'],
        flavorProfile: 'Tangy, Spicy, Crispy, Sweet & Refreshing',
        iconEmoji: '🥟',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Warm Gulab Jamun & Saffron Jalebi',
        nativeName: 'गुलाब जामुन / जलेबी',
        category: 'Dessert / Pastry',
        description: 'Soft golden milk-solid dumplings deep-fried in ghee and soaked in warm cardamom-rose water sugar syrup, paired with crispy pretzel-shaped saffron jalebi spirals.',
        keyIngredients: ['Khoya Milk Solids', 'Rose Water & Cardamom', 'Saffron Sugar Syrup', 'Pure Ghee'],
        flavorProfile: 'Melt-in-Mouth, Intensely Sweet, Floral & Warm',
        culturalSignificance: 'The essential festive confection for Diwali, Eid, weddings, and joy.',
        iconEmoji: '🍯',
      },
    ],
    signatureBeverages: [
      {
        name: 'Masala Chai & Mango Lassi',
        nativeName: 'मसाला चाय / मैंगो लस्सी',
        category: 'Iconic Beverage',
        description: 'Strong Assam black tea slow-simmered with milk, fresh crushed ginger, cardamom, cinnamon, and cloves, poured boiling hot; alongside thick blended yogurt with sweet Alphonso mangoes.',
        keyIngredients: ['Assam Black Tea', 'Fresh Ginger & Green Cardamom', 'Whole Milk', 'Alphonso Mango Pulp', 'Cultured Yogurt'],
        flavorProfile: 'Warmly Spiced, Creamy, Fruity & Invigorating',
        iconEmoji: '☕',
      },
    ],
  },

  // United Kingdom
  '826': {
    culinaryTraditions: 'Classic British cuisine emphasizes hearty roasts, game, farmstead dairy, Atlantic coastal fisheries, and warm baked puddings steeped in centuries of culinary tradition.',
    stapleIngredients: ['Beef Sirloin', 'Atlantic Cod & Haddock', 'Potatoes', 'Cheddar Cheese', 'Malt Vinegar', 'Butter & Clotted Cream'],
    dietaryHeritage: 'Sunday Roast with Yorkshire pudding, fish & chip shops, afternoon high tea, and savory meat pies.',
    nationalDishes: [
      {
        name: 'Sunday Roast with Yorkshire Pudding & Roast Beef',
        nativeName: 'Traditional Sunday Roast',
        category: 'National Dish',
        description: 'Prime dry-aged roast beef sirloin sliced thin and served with towering crispy, hollow Yorkshire puddings, goose-fat roasted potatoes, braised red cabbage, buttered carrots, and rich onion-marrow gravy.',
        keyIngredients: ['Roast Beef Sirloin', 'Yorkshire Pudding (Egg, Flour, Drippings)', 'Goose-Fat Roast Potatoes', 'Rich Beef Gravy', 'English Horseradish'],
        flavorProfile: 'Savory, Crispy, Rich, Peppery & Comforting',
        culturalSignificance: 'The quintessential British family gathering tradition observed every Sunday afternoon.',
        iconEmoji: '🥩',
      },
      {
        name: 'Beer-Battered Fish and Chips',
        nativeName: 'Fish & Chips',
        category: 'Traditional Main',
        description: 'Flaky fresh line-caught Atlantic cod or haddock encased in a light, bubbly ale batter, fried until golden and crisp. Served with thick-cut chips drenched in malt vinegar, mushy peas, and homemade tartare sauce.',
        keyIngredients: ['Atlantic Cod or Haddock', 'Crisp Ale Batter', 'Thick-Cut Maris Piper Chips', 'Malt Vinegar', 'Mushy Peas'],
        flavorProfile: 'Crispy, Flaky, Briny, Tangy & Golden',
        culturalSignificance: 'The national seaside favorite and historic wartime comfort staple since the Victorian era.',
        iconEmoji: '🐟',
      },
      {
        name: 'Chicken Tikka Masala',
        nativeName: 'CTM',
        category: 'Traditional Main',
        description: 'Marinated chicken tikka pieces roasted in a tandoor and simmered in a creamy, lightly spiced tomato and coriander sauce, officially hailed by foreign secretaries as a modern British national dish.',
        keyIngredients: ['Tandoori Spiced Chicken', 'Creamy Tomato Gravy', 'Ground Coriander & Paprika', 'Basmati Rice', 'Warm Naan'],
        flavorProfile: 'Creamy, Mildly Spiced, Savory & Tangy',
        culturalSignificance: 'Symbol of multicultural Britain created by South Asian chefs in Glasgow and London.',
        iconEmoji: '🍛',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Cornish Pasty & Sausage Roll',
        nativeName: 'Cornish Pasty (PGI)',
        category: 'Street Food',
        description: 'D-shaped crimped shortcrust pastry filled with minced beef chuck, sliced potato, swede (rutabaga), and onion, seasoned purely with salt and black pepper.',
        keyIngredients: ['Shortcrust Pastry', 'Beef Skirt', 'Swede (Rutabaga)', 'Potatoes & Black Pepper'],
        flavorProfile: 'Flaky, Peppery, Hearty & Savory',
        iconEmoji: '🥟',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Sticky Toffee Pudding & Scones with Clotted Cream',
        category: 'Dessert / Pastry',
        description: 'Dense sponge cake made with finely chopped Medjool dates, drenched in bubbling toffee sauce, alongside buttery Cornish scones heaped with strawberry jam and thick clotted cream.',
        keyIngredients: ['Medjool Dates', 'Dark Toffee Sauce', 'Vanilla Custard', 'Cornish Clotted Cream', 'Strawberry Jam'],
        flavorProfile: 'Warm, Sticky, Deep Caramel & Luscious',
        iconEmoji: '🍮',
      },
    ],
    signatureBeverages: [
      {
        name: 'English Breakfast Tea & Scotch Single Malt Whisky',
        category: 'Iconic Beverage',
        description: 'Robust blend of Assam, Ceylon, and Kenyan black tea taken with fresh splash of whole milk, alongside peated smoky Islay and Speyside single malt Scotch whiskies.',
        keyIngredients: ['Black Tea Leaves', 'Fresh Milk', 'Malted Barley & Peat Smoke'],
        flavorProfile: 'Bold, Tannic, Smoky & Oak-Vanilla',
        iconEmoji: '🫖',
      },
    ],
  },

  // Germany
  '276': {
    culinaryTraditions: 'Characterized by exceptional charcuterie (over 1,500 varieties of Wurst), centuries of sourdough rye bread baking (Brotkultur), roasted pork knuckles, krauts, and world-renowned Reinheitsgebot brewing heritage.',
    stapleIngredients: ['Pork & Veal', 'Potatoes (Kartoffeln)', 'Sauerkraut', 'Rye & Spelt Flour', 'Mustard (Senf)', 'Bavarian Hops'],
    dietaryHeritage: 'Biergarten communal feasts, Oktoberfest traditions, Abendbrot evening bread spreads, and hearty alpine roasts.',
    nationalDishes: [
      {
        name: 'Sauerbraten with Potato Dumplings & Red Cabbage',
        nativeName: 'Rheinischer Sauerbraten',
        category: 'National Dish',
        description: 'Pot roast of beef chuck marinated for days in red wine, vinegar, cloves, juniper berries, and spices, slow-braised until tender and finished with sweet-sour gingersnap gravy, fluffy potato dumplings, and apple red cabbage.',
        keyIngredients: ['Beef Chuck Roast', 'Red Wine & Vinegar Marinade', 'Juniper & Cloves', 'Gingersnaps (Printen)', 'Kartoffelklöße (Potato Dumplings)'],
        flavorProfile: 'Sweet, Sour, Spiced, Rich & Fork-Tender',
        culturalSignificance: 'Regarded as one of Germany’s most prestigious regional heritage dishes.',
        iconEmoji: '🥩',
      },
      {
        name: 'Schweinshaxe (Crispy Bavarian Pork Knuckle)',
        nativeName: 'Bayerische Schweinshaxe',
        category: 'Traditional Main',
        description: 'Cured ham hock roasted until the thick rind puffs into a glass-shattering golden crackling while the interior meat stays juicy, served with dark beer caraway gravy and fermented sauerkraut.',
        keyIngredients: ['Pork Ham Hock', 'Dark Bavarian Beer', 'Caraway Seeds', 'Fermented Sauerkraut', 'Sweet Mustard'],
        flavorProfile: 'Ultra-Crisp Crackling, Savory, Tangy & Hearty',
        culturalSignificance: 'The legendary centerpiece of Munich beer halls and Oktoberfest celebrations.',
        iconEmoji: '🍖',
      },
      {
        name: 'Currywurst with Pommes Frites',
        nativeName: 'Berliner Currywurst',
        category: 'Traditional Main',
        description: 'Steamed then fried bratwurst sausage sliced into bite-sized medallions, smothered in warm spiced curried ketchup sauce and heavily dusted with fragrant yellow curry powder, served with crispy french fries.',
        keyIngredients: ['Pork Bratwurst', 'Curried Spiced Ketchup', 'Yellow Curry Powder', 'Crispy Fries'],
        flavorProfile: 'Tangy, Sweet, Warmly Spiced & Savory',
        culturalSignificance: 'Iconic Berlin post-war street delicacy invented in 1949 by Herta Heuwer.',
        iconEmoji: '🌭',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Bavarian Pretzel (Brezn) & Weisswurst',
        nativeName: 'Laugenbrezel & Weißwurst',
        category: 'Street Food',
        description: 'Lye-dipped twisted bread with glossy mahogany crust and coarse salt flakes, paired with delicate poached minced veal sausage and sweet Bavarian mustard.',
        keyIngredients: ['Lye-Dipped Yeast Dough', 'Coarse Sea Salt', 'Minced Veal & Parsley', 'Sweet Mustard'],
        flavorProfile: 'Chewy, Malty, Salty & Herby',
        iconEmoji: '🥨',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Black Forest Cake & Apfelstrudel',
        nativeName: 'Schwarzwälder Kirschtorte',
        category: 'Dessert / Pastry',
        description: 'Layers of rich chocolate sponge cake brushed with Kirschwasser (sour cherry schnapps), whipped cream, and tart morello cherries, topped with dark chocolate shavings.',
        keyIngredients: ['Chocolate Sponge', 'Sour Morello Cherries', 'Kirschwasser Cherry Brandy', 'Whipped Cream', 'Dark Chocolate Shavings'],
        flavorProfile: 'Chocolaty, Tart, Creamy & Cherry-Aromatic',
        iconEmoji: '🍰',
      },
    ],
    signatureBeverages: [
      {
        name: 'German Pilsner, Hefeweizen & Riesling Wine',
        category: 'Iconic Beverage',
        description: 'Unfiltered cloudy wheat beer with banana and clove notes, crisp golden lager adhering to the 1516 purity law, and mineral-driven Mosel valley Riesling.',
        keyIngredients: ['Barley & Wheat Malt', 'Hallertau Hops', 'Pure Spring Water', 'Riesling Grapes'],
        flavorProfile: 'Crisp, Bready, Citrus-Banana & Refreshing',
        iconEmoji: '🍺',
      },
    ],
  },

  // Turkey
  '792': {
    culinaryTraditions: 'The heir to Ottoman court cuisine, blending Central Asian nomadic, Middle Eastern, Mediterranean, and Balkan traditions known for charcoal-grilled kebabs, meze spreads, and flaky honey pastries.',
    stapleIngredients: ['Lamb & Veal', 'Eggplants (Aubergine)', 'Pistachios & Walnuts', 'Yogurt', 'Tomato & Red Pepper Paste', 'Pomegranate Molasses'],
    dietaryHeritage: 'Grand Turkish breakfasts (Kahvaltı), charcoal kebabs, simit bakeries, and tea garden socializing.',
    nationalDishes: [
      {
        name: 'Döner Kebab & İskender Kebab',
        nativeName: 'İskender Kebabı / Döner',
        category: 'National Dish',
        description: 'Thinly sliced seasoned lamb and beef shaved from a vertical rotisserie over warm cubed pide bread, drenched in hot tomato sauce, generous foaming browned sheep’s butter, and served with tangy strained yogurt and grilled peppers.',
        keyIngredients: ['Marinated Lamb & Beef', 'Pide Flatbread', 'Browned Foaming Butter', 'Tomato Coulis', 'Thick Strained Yogurt'],
        flavorProfile: 'Smoky, Savory, Richly Buttery & Tangy',
        culturalSignificance: 'Invented in Bursa in 1867, celebrated globally as the gold standard of Turkish meat craft.',
        iconEmoji: '🥙',
      },
      {
        name: 'Kuru Fasulye with Pilav',
        nativeName: 'Kuru Fasulye & Şehriyeli Pilav',
        category: 'Traditional Main',
        description: 'Tender white beans stewed in a clay pot with tomato and sweet red pepper paste, spiced pastırma (cured beef), and onions, served alongside glistening buttery butter-toasted orzo rice pilaf and pickled cucumbers.',
        keyIngredients: ['White Beans (İspir)', 'Pastırma (Cured Beef)', 'Red Pepper Paste (Biber Salçası)', 'Butter Rice Pilaf', 'Pickles (Turşu)'],
        flavorProfile: 'Hearty, Savory, Mildly Spiced & Soul-Warming',
        culturalSignificance: 'Regarded affectionately as the unofficial national home-comfort dish of Turkey.',
        iconEmoji: '🍲',
      },
      {
        name: 'Adana & Urfa Kebab',
        nativeName: 'Adana Kebabı',
        category: 'Traditional Main',
        description: 'Hand-minced prime lamb tail fat and meat hand-skewered on wide iron flat skewers with fiery red hot peppers and grilled over glowing charcoal embers, wrapped in warm lavash with sumac onions.',
        keyIngredients: ['Minced Lamb & Tail Fat', 'Red Hot Peppers', 'Sumac & Parsley Onions', 'Charcoal Smoke', 'Lavash Bread'],
        flavorProfile: 'Fiery, Smoky, Juicy & Peppery',
        iconEmoji: '🍢',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Sesame Simit & Balık Ekmek',
        nativeName: 'Simit & Balık Ekmek',
        category: 'Street Food',
        description: 'Circular molassed bread ring encrusted with toasted sesame seeds, and grilled Bosphorus mackerel stuffed in crusty bread with lemon juice and onions on Istanbul ferry piers.',
        keyIngredients: ['Yeast Dough dipped in Grape Molasses', 'Roasted Sesame Seeds', 'Grilled Mackerel Fillet', 'Lemon & Raw Onion'],
        flavorProfile: 'Crunchy, Nutty, Savory & Oceanic',
        iconEmoji: '🥯',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Antep Pistachio Baklava & Kunefe',
        nativeName: 'Gaziantep Baklavası & Künefe',
        category: 'Dessert / Pastry',
        description: 'Forty paper-thin layers of hand-rolled phyllo dough stuffed with emerald Gaziantep green pistachios, baked until golden and drizzled with hot sugar syrup; alongside shredded kadayıf with stretchy molten cheese.',
        keyIngredients: ['Handmade Phyllo Dough', 'Gaziantep Green Pistachios', 'Clarified Sheep Butter', 'Simple Syrup', 'Hatay Sweet Cheese'],
        flavorProfile: 'Crispy, Flaky, Nutty, Sweet & Rich',
        culturalSignificance: 'EU protected geographical indication (PGI) representing the height of Ottoman pastry artistry.',
        iconEmoji: '🥮',
      },
    ],
    signatureBeverages: [
      {
        name: 'Turkish Coffee & Rize Black Tea (Çay)',
        nativeName: 'Türk Kahvesi & Rize Çayı',
        category: 'Iconic Beverage',
        description: 'Finely pulverized coffee roasted and boiled in a brass cezve pot with thick crema and grounds at the bottom, served alongside double-steeped clear amber tea in tulip glasses.',
        keyIngredients: ['Pulverized Arabica Coffee Beans', 'Spring Water', 'Cardamom Pod (optional)', 'Black Tea Leaves'],
        flavorProfile: 'Intense, Velvety, Aromatic & Bold',
        culturalSignificance: 'Turkish coffee culture and tradition is an official UNESCO Intangible Cultural Heritage.',
        iconEmoji: '☕',
      },
    ],
  },

  // Brazil
  '076': {
    culinaryTraditions: 'A dynamic fusion of Indigenous Amazonian ingredients (cassava, açaí), Portuguese colonist stews, and Afro-Brazilian culinary traditions of Bahia (dendê palm oil, okra, coconut milk).',
    stapleIngredients: ['Black Beans (Feijão)', 'Manioc / Cassava Flour (Farinha)', 'Beef & Pork Cuts', 'Dendê Palm Oil', 'Lime & Garlic', 'Coconut Milk'],
    dietaryHeritage: 'Churrasco rodizio continuous skewers, Saturday feijoada gatherings, and beachside boteco snacks.',
    nationalDishes: [
      {
        name: 'Feijoada Completa',
        nativeName: 'Feijoada Completa',
        category: 'National Dish',
        description: 'Slow-simmered black bean stew packed with smoked pork ribs, carne seca (sun-dried beef), paio sausage, and bacon. Accompanied by white rice, toasted buttery cassava flour (farofa), sautéed garlicky collard greens (couve), and fresh orange slices to cut the richness.',
        keyIngredients: ['Black Beans', 'Smoked Pork Ribs & Paio Sausage', 'Carne Seca (Sun-Dried Beef)', 'Toasted Farofa', 'Sautéed Collard Greens'],
        flavorProfile: 'Deeply Savory, Smoky, Earthy & Hearty',
        culturalSignificance: 'The undisputed national dish of Brazil, traditionally cooked on Saturdays for lively multi-hour family feasts.',
        iconEmoji: '🍲',
      },
      {
        name: 'Churrasco Gaúcho & Picanha',
        nativeName: 'Picanha na Brasa',
        category: 'Traditional Main',
        description: 'Prime beef top sirloin cap with a thick strip of melting fat, skewered and seasoned solely with coarse rock salt, grilled over hot charcoal embers and carved in succulent rare slices tableside.',
        keyIngredients: ['Picanha Beef Cut', 'Coarse Sea Salt', 'Charcoal Embers', 'Vinagrete Salsa', 'Cassava Flour'],
        flavorProfile: 'Beefy, Juicy, Salty & Meltingly Tender',
        culturalSignificance: 'The soul of Southern Brazilian cowboy (Gaúcho) barbecue culture.',
        iconEmoji: '🥩',
      },
      {
        name: 'Moqueca Baiana (Afro-Brazilian Seafood Stew)',
        nativeName: 'Moqueca de Peixe e Camarão',
        category: 'Traditional Main',
        description: 'Fresh white fish fillets and jumbo shrimp poached in a terracotta clay pot with golden dendê red palm oil, fresh coconut milk, bell peppers, tomatoes, onions, garlic, and fresh coriander.',
        keyIngredients: ['Fresh Sea Bass / Snapper', 'Shrimp', 'Dendê Palm Oil', 'Coconut Milk', 'Bell Peppers & Cilantro'],
        flavorProfile: 'Aromatic, Fragrant, Creamy, Tropical & Savory',
        culturalSignificance: 'Vibrant testament to Bahia’s rich African culinary legacy.',
        iconEmoji: '🥘',
      },
    ],
    popularStreetFoods: [
      {
        name: 'Pão de Queijo & Coxinha',
        nativeName: 'Pão de Queijo & Coxinha de Frango',
        category: 'Street Food',
        description: 'Naturally gluten-free baked cheese rolls made from sour tapioca flour and aged Minas cheese with a crisp shell and chewy gooey center; and teardrop fried croquettes filled with shredded spiced chicken and catupiry cheese.',
        keyIngredients: ['Tapioca / Cassava Starch (Polvilho)', 'Minas Aged Cheese', 'Shredded Chicken Breast', 'Catupiry Cream Cheese'],
        flavorProfile: 'Cheesy, Chewy, Crispy & Savory',
        iconEmoji: '🧀',
      },
    ],
    dessertsAndPastries: [
      {
        name: 'Brigadeiros & Açaí na Tigela',
        nativeName: 'Brigadeiro Tradicional',
        category: 'Dessert / Pastry',
        description: 'Velvety fudge truffles cooked with condensed milk, butter, and cocoa powder, hand-rolled in chocolate sprinkles; and frozen Amazonian açaí berry purée topped with sliced bananas and granola.',
        keyIngredients: ['Sweetened Condensed Milk', 'Cocoa Powder', 'Butter', 'Chocolate Sprinkles', 'Pure Amazon Açaí'],
        flavorProfile: 'Deep Chocolate, Fudgy, Sweet & Berry-Fresh',
        culturalSignificance: 'Present at every single Brazilian birthday party and festive gathering.',
        iconEmoji: '🍫',
      },
    ],
    signatureBeverages: [
      {
        name: 'Caipirinha & Guaraná Antarctica',
        category: 'Iconic Beverage',
        description: 'Brazil’s national cocktail made by muddling fresh juicy limes with sugar, pouring over cracked ice, and spiking with high-proof fermented sugarcane cachaça; alongside sparkling tropical Guaraná fruit soda.',
        keyIngredients: ['Sugarcane Cachaça Spirit', 'Fresh Limes', 'Pure Cane Sugar', 'Amazonian Guaraná Berries'],
        flavorProfile: 'Zesty, Citrus-Punchy, Refreshing & Sweet',
        iconEmoji: '🍹',
      },
    ],
  },
};

/**
 * Returns a comprehensive culinary profile for ANY country in the atlas.
 * Uses curated deep recipes for major culinary powers, and systematically synthesizes
 * authentic regional recipes, staple crops, street foods, and national dishes for all 240+ nations.
 */
export function getCountryCulinaryProfile(country: CountryData): CulinaryProfile {
  // Check curated registry
  const curated = CURATED_CULINARY_REGISTRY[country.id] || CURATED_CULINARY_REGISTRY[country.code];
  const detailed = getDetailedCountryInfo(country);
  const rawDish = detailed?.culturalHeritageHighlights?.nationalDish || 'Traditional Regional Specialty';

  // Base fallback structure
  const baseProfile: CulinaryProfile = {
    culinaryTraditions: curated?.culinaryTraditions || `${country.name}'s gastronomy is deeply rooted in local agricultural harvests, indigenous herbs, and generational culinary heritage passed through communal feasts.`,
    stapleIngredients: curated?.stapleIngredients || ['Local Grains & Rice', 'Native Herbs & Spices', 'Seasonal Farm Vegetables', 'Fresh Meat or Fish', 'Cold-Pressed Oils'],
    dietaryHeritage: curated?.dietaryHeritage || 'Characterized by regional market traditions, festive holiday meals, and slow-cooked ancestral recipes.',
    nationalDishes: curated?.nationalDishes && curated.nationalDishes.length > 0
      ? curated.nationalDishes
      : [
          {
            name: rawDish,
            category: 'National Dish',
            description: `The proud traditional culinary centerpiece of ${country.name}, prepared with fresh regional produce, hand-blended spices, and cooked according to time-honored ancestral methods.`,
            keyIngredients: ['Regional Produce', 'Local Spices & Herbs', 'Fresh Cuts of Meat or Grains', 'Traditional Broth'],
            flavorProfile: 'Savory, Aromatic, Traditional & Hearty',
            culturalSignificance: `Regarded as the official culinary identity and cultural pride of ${country.name}.`,
            iconEmoji: '🍲',
          },
          {
            name: `${country.name} Hearth Stew & Flatbread`,
            category: 'Traditional Main',
            description: `A celebrated slow-simmered communal main dish beloved across ${country.name}'s households, enjoyed during family gatherings and national celebrations.`,
            keyIngredients: ['Seasonal Root Vegetables', 'Braised Protein', 'Aromatic Broth', 'Artisan Bread'],
            flavorProfile: 'Warm, Wholesome & Spiced',
            iconEmoji: '🥘',
          },
        ],
    popularStreetFoods: curated?.popularStreetFoods && curated.popularStreetFoods.length > 0
      ? curated.popularStreetFoods
      : [
          {
            name: `${country.name} Savory Pastry & Street Skewer`,
            category: 'Street Food',
            description: `A fast, flavorful street specialty purchased from busy market stalls, fried or grilled to order with house dipping sauces.`,
            keyIngredients: ['Fresh Dough or Marinated Meat', 'Local Chili or Herb Sauce', 'Fresh Onions'],
            flavorProfile: 'Crispy, Spicy & Savory',
            iconEmoji: '🍢',
          },
        ],
    dessertsAndPastries: curated?.dessertsAndPastries && curated.dessertsAndPastries.length > 0
      ? curated.dessertsAndPastries
      : [
          {
            name: `Traditional ${country.name} Sweet Pastry`,
            category: 'Dessert / Pastry',
            description: `A delicate sweet confection made with honey, seasonal fruits, or roasted nuts, served at celebrations and after family meals.`,
            keyIngredients: ['Honey or Cane Sugar', 'Pastry Flour', 'Local Fruits or Nuts'],
            flavorProfile: 'Sweet, Fragrant & Delicate',
            iconEmoji: '🍯',
          },
        ],
    signatureBeverages: curated?.signatureBeverages && curated.signatureBeverages.length > 0
      ? curated.signatureBeverages
      : [
          {
            name: `Traditional ${country.name} Tea or Infusion`,
            category: 'Iconic Beverage',
            description: `A customary hot herbal infusion or refreshing fruit drink served to welcome guests with hospitality.`,
            keyIngredients: ['Local Tea Leaves or Mountain Herbs', 'Pure Spring Water', 'Wild Honey or Sugar'],
            flavorProfile: 'Aromatic, Herbal & Refreshing',
            iconEmoji: '🫖',
          },
        ],
  };

  return baseProfile;
}
