import { Product } from '@/types/product';
import rebarImage from '@/assets/rebar-product.jpg';
import plywoodImage from '@/assets/plywood-product.jpg';
import cementImage from '@/assets/cement-product.jpg';
import nailsImage from '@/assets/nails-product.jpg';
import electricWireImage from '@/assets/electric-wire-product.jpg';
import plasticRopeImage from '@/assets/plastic-rope-product.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Grade 75 Steel Rebar',
    category: 'Rebar',
    description: 'High-strength deformed steel rebar for concrete reinforcement. Meets ASTM A615 standards.',
    price: 25500,
    unit: 'per ton',
    image: rebarImage,
    supplier: {
      id: 'sup1',
      name: 'SteelWorks Industries',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      certifications: ['ISO 9001:2015', 'BIS Certification', 'ASTM A615']
    },
    qualityInspection: {
      grade: 'Grade 75',
      testDate: '2024-08-15',
      certificateNumber: 'QC-2024-SW-001',
      passedTests: ['Tensile Strength', 'Yield Strength', 'Elongation', 'Bend Test']
    },
    specifications: {
      'Diameter': '8mm - 32mm',
      'Length': '12m standard',
      'Yield Strength': '500 MPa min',
      'Tensile Strength': '620 MPa min',
      'Elongation': '14% min'
    },
    inStock: 500,
    minOrderQuantity: 5,
    variants: [
      {
        id: '1-8mm',
        name: '8mm Grade 75 Rebar',
        size: '8mm',
        price: 24000,
        inStock: 80,
        specifications: {
          'Diameter': '8mm',
          'Weight': '0.395 kg/m',
          'Cross Section Area': '50.3 mm²'
        }
      },
      {
        id: '1-10mm',
        name: '10mm Grade 75 Rebar',
        size: '10mm',
        price: 25000,
        inStock: 100,
        specifications: {
          'Diameter': '10mm',
          'Weight': '0.617 kg/m',
          'Cross Section Area': '78.5 mm²'
        }
      },
      {
        id: '1-12mm',
        name: '12mm Grade 75 Rebar',
        size: '12mm',
        price: 25500,
        inStock: 90,
        specifications: {
          'Diameter': '12mm',
          'Weight': '0.888 kg/m',
          'Cross Section Area': '113.1 mm²'
        }
      },
      {
        id: '1-14mm',
        name: '14mm Grade 75 Rebar',
        size: '14mm',
        price: 26000,
        inStock: 70,
        specifications: {
          'Diameter': '14mm',
          'Weight': '1.208 kg/m',
          'Cross Section Area': '153.9 mm²'
        }
      },
      {
        id: '1-16mm',
        name: '16mm Grade 75 Rebar',
        size: '16mm',
        price: 26500,
        inStock: 85,
        specifications: {
          'Diameter': '16mm',
          'Weight': '1.578 kg/m',
          'Cross Section Area': '201.1 mm²'
        }
      },
      {
        id: '1-20mm',
        name: '20mm Grade 75 Rebar',
        size: '20mm',
        price: 27000,
        inStock: 60,
        specifications: {
          'Diameter': '20mm',
          'Weight': '2.466 kg/m',
          'Cross Section Area': '314.2 mm²'
        }
      },
      {
        id: '1-24mm',
        name: '24mm Grade 75 Rebar',
        size: '24mm',
        price: 27500,
        inStock: 45,
        specifications: {
          'Diameter': '24mm',
          'Weight': '3.551 kg/m',
          'Cross Section Area': '452.4 mm²'
        }
      },
      {
        id: '1-32mm',
        name: '32mm Grade 75 Rebar',
        size: '32mm',
        price: 28000,
        inStock: 30,
        specifications: {
          'Diameter': '32mm',
          'Weight': '6.313 kg/m',
          'Cross Section Area': '804.2 mm²'
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Marine Grade Plywood',
    category: 'Plywood',
    description: 'Waterproof plywood sheets perfect for construction and marine applications.',
    price: 3600,
    unit: 'per sheet',
    image: plywoodImage,
    supplier: {
      id: 'sup2',
      name: 'WoodCraft Plyboards',
      location: 'Bangalore, Karnataka',
      rating: 4.6,
      certifications: ['ISI Mark', 'CARB Compliant', 'FSC Certified']
    },
    qualityInspection: {
      grade: 'Marine Grade',
      testDate: '2024-08-10',
      certificateNumber: 'QC-2024-WC-002',
      passedTests: ['Water Resistance', 'Bonding Strength', 'Formaldehyde Emission']
    },
    specifications: {
      'Thickness': '18mm',
      'Size': '8ft x 4ft',
      'Core': 'Hardwood',
      'Glue': 'Phenolic WBP',
      'Moisture Content': '8-12%'
    },
    inStock: 200,
    minOrderQuantity: 10
  },
  {
    id: '3',
    name: 'Portland Cement OPC 53',
    category: 'Cement',
    description: 'High-grade Portland cement for superior concrete strength and durability.',
    price: 11400,
    unit: 'per bag (50kg)',
    image: cementImage,
    supplier: {
      id: 'sup3',
      name: 'BuildStrong Cement',
      location: 'Chennai, Tamil Nadu',
      rating: 4.9,
      certifications: ['BIS Mark', 'ISO 14001:2015', 'OHSAS 18001']
    },
    qualityInspection: {
      grade: 'OPC 53',
      testDate: '2024-08-18',
      certificateNumber: 'QC-2024-BS-003',
      passedTests: ['Compressive Strength', 'Setting Time', 'Soundness', 'Fineness']
    },
    specifications: {
      'Compressive Strength': '53 MPa at 28 days',
      'Initial Setting': '30 min min',
      'Final Setting': '10 hours max',
      'Fineness': '225 m²/kg min',
      'Soundness': '10mm max'
    },
    inStock: 1000,
    minOrderQuantity: 20
  },
  {
    id: '4',
    name: 'Galvanized Steel Nails',
    category: 'Hardware',
    description: 'High-quality galvanized steel nails for framing and construction. Corrosion resistant.',
    price: 1350,
    unit: 'per kg',
    image: nailsImage,
    supplier: {
      id: 'sup4',
      name: 'IronForge Hardware',
      location: 'Pune, Maharashtra',
      rating: 4.7,
      certifications: ['IS 1363:2002', 'Galvanization Standard', 'Quality Mark']
    },
    qualityInspection: {
      grade: 'Grade A',
      testDate: '2024-08-12',
      certificateNumber: 'QC-2024-IF-004',
      passedTests: ['Tensile Strength', 'Galvanization Thickness', 'Corrosion Resistance', 'Dimension Check']
    },
    specifications: {
      'Size Range': '2" to 4" length',
      'Material': 'High Carbon Steel',
      'Coating': 'Hot-dip Galvanized',
      'Point Type': 'Diamond Point',
      'Zinc Coating': '55 microns min'
    },
    inStock: 800,
    minOrderQuantity: 25
  },
  {
    id: '5',
    name: 'Copper Electrical Wire',
    category: 'Electrical',
    description: 'Premium copper electrical wire for residential and commercial construction wiring.',
    price: 20400,
    unit: 'per 100m roll',
    image: electricWireImage,
    supplier: {
      id: 'sup5',
      name: 'PowerLine Cables',
      location: 'Noida, Uttar Pradesh',
      rating: 4.8,
      certifications: ['ISI Mark', 'BIS Approval', 'Fire Retardant Certified']
    },
    qualityInspection: {
      grade: 'Grade 1',
      testDate: '2024-08-14',
      certificateNumber: 'QC-2024-PL-005',
      passedTests: ['Conductivity Test', 'Insulation Resistance', 'Voltage Withstand', 'Fire Retardancy']
    },
    specifications: {
      'Conductor': '99.9% Pure Copper',
      'Gauge': '14 AWG (2.5 sq mm)',
      'Insulation': 'PVC FR Grade',
      'Voltage Rating': '1100V',
      'Temperature Rating': '70°C'
    },
    inStock: 300,
    minOrderQuantity: 5
  },
  {
    id: '6',
    name: 'Heavy Duty Plastic Rope',
    category: 'Safety & Tools',
    description: 'High-strength polypropylene rope for construction lifting, securing, and safety applications.',
    price: 5400,
    unit: 'per 100m coil',
    image: plasticRopeImage,
    supplier: {
      id: 'sup6',
      name: 'SafetyFirst Ropes',
      location: 'Ahmedabad, Gujarat',
      rating: 4.6,
      certifications: ['EN 1891', 'Working Load Limit Certified', 'UV Resistant']
    },
    qualityInspection: {
      grade: 'Industrial Grade',
      testDate: '2024-08-16',
      certificateNumber: 'QC-2024-SF-006',
      passedTests: ['Tensile Strength', 'UV Resistance', 'Abrasion Resistance', 'Load Capacity']
    },
    specifications: {
      'Diameter': '12mm',
      'Material': '100% Polypropylene',
      'Breaking Load': '1800 kg',
      'Working Load': '360 kg',
      'UV Protection': 'Yes'
    },
    inStock: 150,
    minOrderQuantity: 2
  }
];