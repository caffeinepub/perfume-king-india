import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

actor {
  type Perfume = {
    id : Nat;
    name : Text;
    price : Text;
    description : Text;
    category : Text;
    shortDescription : Text;
    topNotes : Text;
    heartNotes : Text;
    baseNotes : Text;
    longevity : Nat;
    projection : Nat;
    isBestSeller : Bool;
  };

  let perfumes = Map.empty<Nat, Perfume>();

  public shared ({ caller }) func init() : async () {
    let initialPerfumes = [
      {
        id = 1;
        name = "Luxury Essence Oud";
        price = "₹ 15,000";
        description = "A rich blend of oud, rose, and amber, offering a long-lasting scent.";
        category = "Niche";
        shortDescription = "Rich oud with floral and amber notes.";
        topNotes = "Rose, Bergamot";
        heartNotes = "Oud, Patchouli";
        baseNotes = "Amber, Musk";
        longevity = 9;
        projection = 8;
        isBestSeller = true;
      },
      {
        id = 2;
        name = "Fresh Citrus Splash";
        price = "₹ 8,500";
        description = "A vibrant citrus fragrance with refreshing top notes.";
        category = "Designer";
        shortDescription = "Citrusy and refreshing scent.";
        topNotes = "Lemon, Orange";
        heartNotes = "Jasmine, Lavender";
        baseNotes = "Cedarwood, Musk";
        longevity = 7;
        projection = 6;
        isBestSeller = false;
      },
      {
        id = 3;
        name = "Midnight Musk";
        price = "₹ 12,000";
        description = "Deep musky scent perfect for evening wear.";
        category = "Tester";
        shortDescription = "Musky and oriental fragrance.";
        topNotes = "Blackcurrant, Pepper";
        heartNotes = "Musk, Vetiver";
        baseNotes = "Sandalwood, Tonka Bean";
        longevity = 8;
        projection = 7;
        isBestSeller = true;
      },
      {
        id = 4;
        name = "Floral Breeze";
        price = "₹ 6,000";
        description = "A light floral scent with notes of jasmine and lily.";
        category = "Decant";
        shortDescription = "Light floral fragrance.";
        topNotes = "Lily, Jasmine";
        heartNotes = "Peony, Freesia";
        baseNotes = "Musk, Cedar";
        longevity = 6;
        projection = 5;
        isBestSeller = false;
      },
      {
        id = 5;
        name = "Amber Waves";
        price = "₹ 10,000";
        description = "Warm amber fragrance with wood and spice undertones.";
        category = "Best Seller";
        shortDescription = "Warm and spicy amber scent.";
        topNotes = "Spices, Bergamot";
        heartNotes = "Amber, Vanilla";
        baseNotes = "Sandalwood, Patchouli";
        longevity = 8;
        projection = 7;
        isBestSeller = true;
      },
      {
        id = 6;
        name = "Oceanic Mist";
        price = "₹ 9,000";
        description = "Fresh aquatic fragrance with sea breeze notes.";
        category = "Designer";
        shortDescription = "Aquatic and refreshing scent.";
        topNotes = "Sea Breeze, Lemon";
        heartNotes = "Lavender, Jasmine";
        baseNotes = "Musk, Cedar";
        longevity = 7;
        projection = 6;
        isBestSeller = false;
      },
      {
        id = 7;
        name = "Spicy Leather";
        price = "₹ 13,500";
        description = "Bold leather scent with spicy undertones.";
        category = "Niche";
        shortDescription = "Leather scent with spicy notes.";
        topNotes = "Pepper, Cardamom";
        heartNotes = "Leather, Patchouli";
        baseNotes = "Vanilla, Amber";
        longevity = 9;
        projection = 8;
        isBestSeller = true;
      },
      {
        id = 8;
        name = "Green Forest";
        price = "₹ 7,500";
        description = "Earthy scent with hints of green and woody notes.";
        category = "Tester";
        shortDescription = "Earthy and woody fragrance.";
        topNotes = "Pine, Bergamot";
        heartNotes = "Cedar, Vetiver";
        baseNotes = "Moss, Amber";
        longevity = 6;
        projection = 6;
        isBestSeller = false;
      },
      {
        id = 9;
        name = "Velvet Rose";
        price = "₹ 11,000";
        description = "Luxurious rose scent with velvet undertones.";
        category = "Decant";
        shortDescription = "Luxurious rose fragrance.";
        topNotes = "Rose, Peony";
        heartNotes = "Jasmine, Vanilla";
        baseNotes = "Musk, Amber";
        longevity = 8;
        projection = 7;
        isBestSeller = true;
      },
      {
        id = 10;
        name = "Citrus Gourmand";
        price = "₹ 9,500";
        description = "Citrusy scent with a sweet gourmand twist.";
        category = "Best Seller";
        shortDescription = "Sweet and fresh citrus fragrance.";
        topNotes = "Orange, Lemon";
        heartNotes = "Vanilla, Caramel";
        baseNotes = "Musk, Sandalwood";
        longevity = 7;
        projection = 6;
        isBestSeller = false;
      },
      {
        id = 11;
        name = "Woodland Spice";
        price = "₹ 12,500";
        description = "Spicy fragrance with woody undertones.";
        category = "Designer";
        shortDescription = "Spicy and woody scent.";
        topNotes = "Clove, Cinnamon";
        heartNotes = "Cedar, Patchouli";
        baseNotes = "Amber, Musk";
        longevity = 8;
        projection = 7;
        isBestSeller = true;
      },
      {
        id = 12;
        name = "Jasmine Dream";
        price = "₹ 8,000";
        description = "Soft floral fragrance with jasmine focus.";
        category = "Niche";
        shortDescription = "Soft floral jasmine scent.";
        topNotes = "Jasmine, Lily";
        heartNotes = "Rose, Vanilla";
        baseNotes = "Sandalwood, Musk";
        longevity = 7;
        projection = 6;
        isBestSeller = false;
      },
    ];

    for (perfume in initialPerfumes.values()) {
      perfumes.add(perfume.id, perfume);
    };
  };

  public query ({ caller }) func getAllPerfumes() : async [Perfume] {
    perfumes.values().toArray();
  };

  public query ({ caller }) func getPerfumeById(id : Nat) : async ?Perfume {
    perfumes.get(id);
  };

  public query ({ caller }) func getPerfumesByCategory(category : Text) : async [Perfume] {
    let filtered = List.empty<Perfume>();
    for (perfume in perfumes.values()) {
      if (Text.equal(perfume.category, category)) {
        filtered.add(perfume);
      };
    };
    filtered.reverse().toArray();
  };

  public query ({ caller }) func getBestSellers() : async [Perfume] {
    let bestSellers = List.empty<Perfume>();
    for (perfume in perfumes.values()) {
      if (perfume.isBestSeller) {
        bestSellers.add(perfume);
      };
    };
    bestSellers.reverse().toArray();
  };

  public query ({ caller }) func searchPerfumes(searchQuery : Text) : async [Perfume] {
    let lowerQuery = searchQuery.trim(#char ' ').toLower();

    if (lowerQuery.size() == 0) { Runtime.trap("Please insert at least one character to begin search") };

    let results = List.empty<Perfume>();
    perfumes.values().forEach(
      func(perfume) {
        let lowerName = perfume.name.toLower();
        if (lowerName.contains(#text(lowerQuery))) {
          results.add(perfume);
        };
      }
    );
    results.reverse().toArray();
  };
};
