import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import RelatedSeoLinks from "@/components/seo/RelatedSeoLinks";

type ServiceSection = {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

type ServiceDetailEntry = {
  title: string;
  h1: string;
  desc: string;
  features: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  sections?: ServiceSection[];
  faq?: Array<{ q: string; a: string }>;
  relatedLinks?: Array<{ label: string; href: string; description?: string }>;
};

const serviceDetails: Record<string, ServiceDetailEntry> = {
  "moving-inside-riyadh": {
    title: "نقل أثاث داخل الرياض",
    h1: "نقل أثاث داخل الرياض - خدمة احترافية وآمنة",
    desc: "نقدم خدمة نقل الأثاث داخل جميع أحياء الرياض بأعلى معايير الجودة والأمان. فريقنا المتخصص يضمن لك تجربة نقل سلسة وسريعة مع الحفاظ التام على سلامة أثاثك. نغطي جميع أحياء الرياض بما فيها حي النرجس، الياسمين، الملقا، العليا، السليمانية، وجميع الأحياء الأخرى.",
    features: [
      "نقل آمن لجميع أنواع الأثاث المنزلي والمكتبي",
      "فك وتركيب احترافي لغرف النوم والمطابخ",
      "تغليف شامل بمواد عالية الجودة",
      "سيارات مجهزة ومؤمنة بالكامل",
      "فريق عمل مدرب ومحترف",
      "أسعار تنافسية وعروض مميزة",
      "التزام تام بالمواعيد المحددة",
      "ضمان سلامة الأثاث أثناء النقل",
    ],
  },
  "moving-outside-riyadh": {
    title: "نقل أثاث خارج الرياض",
    h1: "نقل أثاث من الرياض لجميع مدن المملكة",
    desc: "خدمة نقل أثاث موثوقة ومحترفة من الرياض إلى جميع مدن المملكة العربية السعودية. نوفر سيارات مجهزة ومؤمنة للمسافات الطويلة مع ضمان وصول أثاثك بأمان تام إلى وجهتك الجديدة سواء كانت جدة، الدمام، مكة، المدينة أو أي مدينة أخرى.",
    features: [
      "نقل لجميع مدن المملكة بسيارات مجهزة",
      "تأمين شامل على الأثاث أثناء الرحلة",
      "تغليف محكم للحماية من الاهتزازات",
      "تتبع الشحنة حتى التسليم",
      "أسعار تنافسية للمسافات الطويلة",
      "خبرة طويلة في النقل بين المدن",
      "فريق متخصص في التعامل مع القطع الكبيرة",
      "خدمة التوصيل حتى باب المنزل",
    ],
  },
  "assembly-disassembly": {
    title: "فك وتركيب الأثاث",
    h1: "فك وتركيب جميع أنواع الأثاث باحترافية",
    desc: "فنيون متخصصون ومحترفون في فك وتركيب جميع أنواع الأثاث بدقة عالية. نتعامل مع غرف النوم، المطابخ، المكيفات، الستائر، وجميع أنواع الأثاث المنزلي والمكتبي مع ضمان إعادة التركيب بنفس الجودة الأصلية.",
    features: [
      "فك وتركيب غرف النوم بجميع أنواعها",
      "فك وتركيب المطابخ بدقة عالية",
      "تركيب المكيفات والستائر",
      "فنيون متخصصون ومؤهلون",
      "أدوات ومعدات حديثة ومتطورة",
      "ضمان جودة التركيب",
      "خبرة في التعامل مع جميع الماركات",
      "أسعار مناسبة لجميع الخدمات",
    ],
  },
  packing: {
    title: "تغليف أثاث بالرياض",
    metaTitle: "تغليف اثاث بالرياض | شركة تغليف أثاث وعفش قبل النقل",
    metaDescription:
      "خدمة تغليف الاثاث بالرياض قبل النقل: تغليف الزجاج والمرايا وغرف النوم والأجهزة بمواد حماية مناسبة. شركة تغليف اثاث وعفش بالرياض — اطلب عرض سعر.",
    keywords:
      "تغليف الاثاث, تغليف اثاث, تغليف الأثاث, تغليف الاثاث للنقل, تغليف ونقل الاثاث, شركة تغليف اثاث بالرياض, تغليف العفش والاثاث, تغليف أثاث بالرياض",
    h1: "تغليف اثاث بالرياض قبل النقل",
    desc: "تغليف الأثاث هو الخطوة التي تحدد حالة العفش بعد وصوله. نقوم بتغليف الاثاث للنقل داخل الرياض بمواد مناسبة لكل قطعة: الزجاج والمرايا، أسطح الخشب، غرف النوم، الكنب، والأجهزة الكهربائية، مع ترقيم الكراتين لتسهيل الفرز وإعادة الترتيب في المنزل الجديد.",
    features: [
      "مواد تغليف متنوعة حسب نوع القطعة",
      "تغليف خاص للزجاج والمرايا والقطع القابلة للكسر",
      "حماية أسطح الخشب من الخدوش أثناء الحمل",
      "تغليف الأجهزة الكهربائية وتثبيت الأجزاء المتحركة",
      "فقاعات هوائية وكرتون مقوى وأغطية واقية",
      "تغليف التحف واللوحات والقطع الثمينة",
      "ترقيم وتصنيف الكراتين حسب الغرفة",
      "إمكانية دمج التغليف مع النقل والفك والتركيب",
    ],
    sections: [
      {
        h2: "لماذا يبدأ النقل الناجح بالتغليف؟",
        paragraphs: [
          "معظم الأضرار التي تحدث للعفش لا تحدث في الطريق، بل أثناء الحمل والتنزيل ومرور القطع من الأبواب والمصاعد. التغليف الجيد يمتص الاحتكاك والصدمات البسيطة ويمنع الخدوش التي يصعب إصلاحها لاحقاً.",
          "لهذا نتعامل مع تغليف العفش والاثاث كخدمة مستقلة لها خطواتها، سواء طلبت التغليف وحده أو ضمن خدمة تغليف ونقل الاثاث في نفس الموعد.",
        ],
      },
      {
        h2: "خطوات التغليف عند مؤسسة لمس",
        bullets: [
          "معاينة سريعة للقطع وتحديد ما يحتاج حماية إضافية.",
          "تفريغ محتويات الدواليب والأدراج وتجميعها في كراتين مرقمة.",
          "فك القطع الكبيرة عند الحاجة لتسهيل التغليف والحمل.",
          "تغليف كل قطعة بالمادة المناسبة لسطحها وحجمها.",
          "تثبيت الأجزاء المتحركة والأبواب والزجاج قبل التحميل.",
          "كتابة اسم الغرفة على الكرتون ليصل إلى مكانه الصحيح.",
        ],
      },
      {
        h2: "مواد التغليف وطرق الحماية",
        paragraphs: [
          "نختار المادة حسب القطعة: الفقاعات الهوائية للزجاج والقطع الحساسة، الكرتون المقوى للأدوات الصغيرة والمقتنيات، الأغطية والبطانيات لأسطح الخشب والكنب، واللواصق القوية لتثبيت الأطراف والأغطية.",
        ],
        bullets: [
          "فقاعات هوائية متعددة الطبقات للزجاج والمرايا.",
          "كرتون مقوى بمقاسات مختلفة للأدوات والكتب والمقتنيات.",
          "أغطية وبطانيات لحماية الكنب وأسطح الخشب من الخدش.",
          "زوايا وحواف واقية للطاولات والقطع ذات الأركان الحادة.",
          "أكياس مخصصة للمراتب والستائر والمفروشات.",
        ],
      },
      {
        h2: "التغليف قبل النقل: ماذا تجهز أنت؟",
        paragraphs: [
          "قبل موعد التغليف يفضل تفريغ الأدراج والخزائن من الأغراض الصغيرة، وفصل الأجهزة الكهربائية عن الكهرباء والماء قبل وقت كافٍ، وتجميع الأوراق والمقتنيات الثمينة في صندوق تحتفظ به معك.",
        ],
        links: [
          { label: "دليل تغليف الأثاث بالرياض", href: "/guides/furniture-packing-riyadh" },
          { label: "قائمة تجهيز المنزل قبل النقل", href: "/guides/moving-checklist-riyadh" },
          { label: "دليل نقل العفش الشامل", href: "/moving-guide" },
        ],
      },
      {
        h2: "تغليف القطع القابلة للكسر",
        paragraphs: [
          "المرايا وأسطح الزجاج والأطقم والتحف تحتاج طبقات متعددة وتثبيتاً يمنع الحركة داخل الكرتون. نعلّم هذه الكراتين بوضوح حتى يتم حملها ووضعها بالشكل الصحيح أثناء التحميل والتنزيل.",
        ],
      },
      {
        h2: "تغليف غرف النوم والقطع الكبيرة",
        paragraphs: [
          "الدواليب وغرف النوم غالباً تحتاج فكاً قبل التغليف، ثم تغليف الألواح والمرايا كل على حدة وتجميع المسامير والملحقات في كيس مرقم لكل قطعة، لتسهيل إعادة التركيب في المنزل الجديد.",
        ],
        links: [
          { label: "فك وتركيب الأثاث", href: "/services/assembly-disassembly" },
          { label: "نقل شقق بالرياض", href: "/services/apartment-moving-riyadh" },
          { label: "نقل فلل بالرياض", href: "/services/villa-moving-riyadh" },
        ],
      },
      {
        h2: "تغليف ونقل الأثاث في طلب واحد",
        paragraphs: [
          "يمكن دمج التغليف مع النقل داخل الرياض في نفس الموعد، فيصل الفريق ليغلف ثم يحمل ويسلم. هذا الخيار مناسب للنقلات التي تريد إنهاءها في يوم واحد دون تجهيز مسبق منك.",
        ],
        links: [
          { label: "نقل أثاث داخل الرياض", href: "/services/moving-inside-riyadh" },
          { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh" },
          { label: "نقل عفش الرياض حسب الحي", href: "/areas/riyadh" },
        ],
      },
    ],
    faq: [
      { q: "كم تكلفة تغليف الاثاث بالرياض؟", a: "التكلفة تعتمد على عدد القطع ونوعها وكمية الزجاج والمرايا وهل التغليف مطلوب وحده أم مع النقل. نرسل تقديراً بعد معرفة تفاصيل الأثاث." },
      { q: "هل يمكن طلب التغليف فقط بدون نقل؟", a: "نعم، يمكن تنسيق تغليف الأثاث وحده داخل الرياض إذا كان النقل سيتم في موعد آخر أو بترتيب مختلف." },
      { q: "هل توفرون مواد التغليف؟", a: "نعم، نأتي بمواد التغليف المناسبة للقطع المتفق عليها ضمن الطلب." },
      { q: "كم يستغرق تغليف شقة كاملة؟", a: "يختلف حسب عدد الغرف وكمية القطع الحساسة؛ الشقق الصغيرة تنتهي عادة في وقت أقصر من الفلل والغرف المتعددة." },
      { q: "هل تغلفون الأجهزة الكهربائية؟", a: "نعم، يتم تغليف الأجهزة وتثبيت أبوابها وأجزائها المتحركة قبل الحمل، مع مراعاة فصلها عن الكهرباء والماء قبل الموعد." },
    ],
    relatedLinks: [
      { label: "دليل تغليف الأثاث بالرياض", href: "/guides/furniture-packing-riyadh", description: "خطوات عملية ومواد التغليف المناسبة لكل قطعة." },
      { label: "نقل أثاث داخل الرياض", href: "/services/moving-inside-riyadh", description: "النقل بين أحياء الرياض مع التغليف والفك والتركيب." },
      { label: "نقل شقق بالرياض", href: "/services/apartment-moving-riyadh", description: "تنظيم نقل الشقق حسب عدد الغرف والطابق." },
      { label: "نقل فلل بالرياض", href: "/services/villa-moving-riyadh", description: "خطة للغرف والأدوار والقطع الكبيرة." },
      { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh", description: "سيارة مناسبة للنقلات داخل المدينة." },
      { label: "مناطق خدمة نقل الأثاث", href: "/service-areas", description: "أحياء الرياض ومناطقها الخمس." },
    ],
  },
  "office-moving": {
    title: "نقل مكاتب بالرياض",
    metaTitle: "نقل مكاتب بالرياض | نقل اثاث مكتبي - Office Relocation",
    metaDescription:
      "نقل مكاتب بالرياض ونقل اثاث مكتبي مع التخطيط والتغليف والفك والتركيب وتنظيم التحميل لتقليل توقف العمل. اطلب عرض سعر لنقل مكتبك الآن.",
    keywords:
      "نقل مكاتب, نقل مكاتب بالرياض, نقل اثاث مكتبي, نقل أثاث مكتبي بالرياض, office relocation riyadh, نقل شركات بالرياض",
    h1: "نقل مكاتب بالرياض ونقل الأثاث المكتبي",
    desc: "نقل المكاتب يختلف عن نقل المنازل: هناك أثاث مكتبي ثقيل، أجهزة، وأرشيف، ووقت عمل لا يحتمل التوقف الطويل. ننظم نقل مكتبك داخل الرياض بخطة واضحة تبدأ من حصر الأثاث وتنتهي بتسليم كل قطعة في مكانها الجديد.",
    features: [
      "حصر الأثاث المكتبي والأجهزة قبل الموعد",
      "فك وتركيب المكاتب وطاولات الاجتماعات",
      "تغليف الأجهزة والشاشات والطابعات",
      "نقل الخزائن والأرشيف بترقيم واضح",
      "إمكانية تنسيق النقل خارج أوقات الدوام",
      "فريق معتاد على العمل داخل المباني الإدارية",
      "تحميل وتسليم منظم حسب خريطة المكتب الجديد",
      "تقدير سعر حسب حجم المكتب وعدد الأدوار",
    ],
    sections: [
      {
        h2: "التخطيط قبل نقل المكتب",
        paragraphs: [
          "نبدأ بحصر عدد المكاتب والكراسي والخزائن والأجهزة، ومعرفة الدور ومداخل المبنى والمصاعد في الموقعين. من هذه المعلومات نحدد عدد العمال والسيارات والوقت المتوقع، ونتفق معك على موعد يقلل تأثير النقل على سير العمل.",
        ],
        bullets: [
          "حصر الأثاث والأجهزة لكل قسم.",
          "تحديد الأولويات: ما ينتقل أولاً وما يمكن تأجيله.",
          "خريطة مبدئية لتوزيع المكاتب في الموقع الجديد.",
          "الاتفاق على موعد النقل ومدة التنفيذ التقريبية.",
        ],
      },
      {
        h2: "تغليف الأثاث المكتبي والأجهزة",
        paragraphs: [
          "الشاشات وأجهزة الكمبيوتر والطابعات تُغلف بمواد واقية، والأسطح الزجاجية لطاولات الاجتماعات تُغلف كل على حدة. الملفات والأرشيف تُعبأ في كراتين مرقمة باسم القسم حتى لا تختلط الوثائق عند الاستلام.",
        ],
        links: [
          { label: "خدمة تغليف الأثاث", href: "/services/packing" },
          { label: "دليل نقل المكاتب بالرياض", href: "/guides/office-moving-riyadh-guide" },
        ],
      },
      {
        h2: "الفك وإعادة التركيب",
        paragraphs: [
          "المكاتب المقسمة والوحدات التخزينية والفواصل تحتاج فكاً منظماً مع تجميع الملحقات لكل قطعة في كيس مرقم، ثم إعادة تركيبها في الموقع الجديد بنفس الترتيب المتفق عليه.",
        ],
        links: [
          { label: "فك وتركيب الأثاث", href: "/services/assembly-disassembly" },
        ],
      },
      {
        h2: "المكاتب والخزائن وطاولات الاجتماعات",
        bullets: [
          "المكاتب المفردة والمقسمة وكراسي الموظفين.",
          "طاولات الاجتماعات وأسطحها الزجاجية أو الخشبية.",
          "خزائن الملفات ووحدات الأرشيف.",
          "أثاث الاستقبال وغرف المدراء.",
        ],
      },
      {
        h2: "تحميل وتسليم منظم",
        paragraphs: [
          "يتم التحميل بترتيب يراعي حجم القطع وتسلسل التنزيل، ويجري التسليم حسب خريطة المكتب الجديد بحيث تصل أثاث كل قسم إلى مساحته مباشرة بدل تكديس القطع في مكان واحد.",
        ],
        links: [
          { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh" },
          { label: "نقل عفش داخل الرياض", href: "/areas/riyadh" },
        ],
      },
      {
        h2: "تقليل توقف العمل",
        paragraphs: [
          "يمكن تنسيق النقل في نهاية الأسبوع أو خارج أوقات الدوام حسب توفر الموعد وطبيعة المبنى، وتقسيم النقل على مراحل للأقسام الكبيرة حتى يستمر جزء من العمل أثناء التنفيذ.",
        ],
        links: [
          { label: "نقل مكاتب شمال الرياض", href: "/areas/riyadh/north" },
          { label: "نقل مكاتب وسط الرياض", href: "/areas/riyadh/central" },
        ],
      },
    ],
    faq: [
      { q: "كم يستغرق نقل مكتب بالرياض؟", a: "يعتمد على عدد الموظفين وكمية الأثاث والأجهزة وعدد الأدوار ومداخل المبنى. نعطيك مدة تقريبية بعد حصر الأثاث." },
      { q: "هل يمكن نقل المكتب خارج أوقات الدوام؟", a: "يمكن تنسيق موعد مسائي أو في نهاية الأسبوع حسب توفر الفريق وأنظمة المبنى." },
      { q: "هل تشمل الخدمة فك وتركيب الأثاث المكتبي؟", a: "نعم، يمكن إضافة فك وتركيب المكاتب والخزائن وطاولات الاجتماعات ضمن الطلب." },
      { q: "هل تنقلون الأرشيف والملفات؟", a: "نعم، يتم تعبئة الملفات في كراتين مرقمة باسم القسم لتسهيل الاستلام والترتيب." },
      { q: "كيف يتم تسعير نقل المكاتب؟", a: "التسعير حسب حجم الأثاث وعدد الأجهزة والأدوار والمسافة وما إذا كان الطلب يشمل التغليف والفك والتركيب." },
    ],
    relatedLinks: [
      { label: "دليل نقل المكاتب بالرياض", href: "/guides/office-moving-riyadh-guide", description: "خطوات التخطيط والتنفيذ لنقل مكتب كامل." },
      { label: "تغليف الأثاث المكتبي", href: "/services/packing", description: "تغليف الأجهزة والأسطح الزجاجية والأرشيف." },
      { label: "فك وتركيب الأثاث", href: "/services/assembly-disassembly", description: "فك المكاتب والخزائن وإعادة تركيبها." },
      { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh", description: "سيارة مناسبة لنقل الأثاث داخل المدينة." },
      { label: "نقل عفش الرياض", href: "/areas/riyadh", description: "تغطية أحياء ومناطق الرياض." },
      { label: "نقل عفش شمال الرياض", href: "/areas/riyadh/north", description: "خدمة المكاتب والشركات في شمال المدينة." },
    ],
  },
  "apartment-moving-riyadh": {
    title: "نقل شقق بالرياض",
    h1: "نقل شقق بالرياض مع الفك والتركيب والتغليف",
    desc: "خدمة نقل شقق داخل الرياض تبدأ بتحديد كمية الأثاث والطابق ومداخل المبنى، ثم تنظيم الفك والتغليف والتحميل والتسليم حسب احتياج الطلب. مناسبة للانتقال بين أحياء الرياض مع إمكانية دمج كل الخدمات في موعد واحد.",
    features: [
      "تنظيم النقل حسب عدد الغرف والطابق",
      "فك وتركيب غرف النوم والدواليب عند الحاجة",
      "تغليف القطع الحساسة والمرايا",
      "ترقيم الكراتين حسب الغرف",
      "تحديد السيارة والفريق حسب حجم الأثاث",
      "تنسيق الوصول والمصعد ومكان التحميل",
      "إعادة تركيب القطع في الموقع الجديد",
      "خدمة متاحة داخل أحياء الرياض",
    ],
  },
  "villa-moving-riyadh": {
    title: "نقل فلل بالرياض",
    h1: "نقل فلل بالرياض بخطة منظمة للغرف والأدوار",
    desc: "نقل الفلل يحتاج تخطيطاً للغرف والقطع الكبيرة وعدد الأدوار قبل يوم التنفيذ. نوفر النقل مع خيارات الفك والتركيب والتغليف، وتنظيم التحميل والتسليم بحيث تصل القطع إلى أماكنها الصحيحة في المنزل الجديد.",
    features: [
      "خطة للغرف والأدوار قبل بدء التحميل",
      "فك وتركيب الأثاث الكبير",
      "تغليف المرايا والزجاج والأجهزة",
      "تنظيم الكراتين حسب الغرفة",
      "تحديد عدد العمال والسيارات حسب الطلب",
      "تنسيق القطع الثقيلة ومداخل المنزل",
      "تسليم مرتب يسهل إعادة التركيب",
      "خدمة داخل الرياض والمناطق المستهدفة",
    ],
  },
  "furniture-storage-riyadh": {
    title: "تخزين أثاث بالرياض",
    h1: "تخزين أثاث بالرياض مع التجهيز والتغليف",
    desc: "خدمة تجهيز الأثاث قبل التخزين تشمل تنظيف وتجفيف القطع عند الحاجة، وفك الأثاث الكبير، وتغليف الأسطح الحساسة وترقيم الملحقات لتسهيل الاستلام وإعادة التركيب بعد انتهاء فترة التخزين.",
    features: [
      "تجهيز القطع قبل التخزين",
      "فك الأثاث الكبير لتوفير المساحة عند الحاجة",
      "تغليف الزجاج والمرايا والأسطح الحساسة",
      "ترقيم القطع والملحقات",
      "تنظيم النقل إلى موقع التخزين",
      "تجهيز الأثاث للاستلام لاحقاً",
      "إمكانية دمج النقل والتغليف",
      "تقدير حسب حجم الأثاث ومدة التخزين",
    ],
  },  "dyna-moving-riyadh": {
    title: "دينا نقل عفش بالرياض",
    h1: "دينا نقل عفش بالرياض للقطع والشقق داخل المدينة",
    desc: "خدمة دينا نقل عفش بالرياض للطلبات التي تحتاج سيارة مناسبة لنقل الأثاث بين الأحياء. نحدد حجم السيارة والفريق بعد معرفة كمية العفش والقطع الكبيرة والطابق وموقعي الاستلام والتسليم.",
    features: [
      "اختيار السيارة حسب كمية وحجم الأثاث",
      "نقل بين أحياء الرياض المختلفة",
      "إمكانية إضافة التحميل والتنزيل",
      "فك وتركيب القطع الكبيرة عند الحاجة",
      "تغليف الزجاج والمرايا والقطع الحساسة",
      "مناسبة للنقلات الصغيرة والمتوسطة حسب التفاصيل",
      "تنسيق الموعد وموقعي الاستلام والتسليم",
      "طلب تقدير قبل تأكيد الحجز",
    ],
    faq: [
      { q: "هل الدينا مناسبة لكل نقلات العفش؟", a: "يتم تحديد السيارة المناسبة حسب كمية الأثاث وأبعاده وعدد الرحلات المتوقعة، لذلك ليست كل الطلبات متشابهة." },
      { q: "هل يمكن طلب دينا لنقل قطع محدودة؟", a: "يمكن تنسيق نقل القطع المحدودة داخل الرياض حسب الحجم والموقع والموعد." },
      { q: "هل تشمل الخدمة الفك والتركيب؟", a: "يمكن إضافة الفك والتركيب والتغليف حسب نوع الأثاث واحتياج الطلب." },
    ],
  },
  "single-item-moving-riyadh": {
    title: "نقل قطعة أثاث بالرياض",
    h1: "نقل قطعة أثاث بالرياض للكنب والدواليب والأجهزة",
    desc: "خدمة نقل قطعة أو عدد محدود من قطع الأثاث داخل الرياض، مثل كنبة أو دولاب أو طاولة أو جهاز كبير، مع تحديد طريقة الحمل والتغليف والسيارة المناسبة حسب حجم القطعة وموقعي النقل.",
    features: [
      "نقل قطعة واحدة أو عدد محدود من القطع",
      "مناسبة للكنب والدواليب والطاولات والأجهزة",
      "تحديد التجهيز حسب الوزن والأبعاد",
      "تغليف إضافي للزجاج والأسطح الحساسة",
      "فك القطعة وإعادة تركيبها عند الحاجة",
      "تنسيق التحميل من الشقق والمنازل",
      "نقل داخل أحياء الرياض",
      "طلب تقدير بعد إرسال تفاصيل القطعة",
    ],
    faq: [
      { q: "هل يمكن نقل كنبة أو دولاب فقط؟", a: "يمكن تنسيق نقل قطعة واحدة أو عدة قطع بعد معرفة المقاس والموقع والطابق وطريقة الوصول." },
      { q: "هل تحتاج القطعة إلى تغليف؟", a: "يعتمد ذلك على نوع السطح وحساسية القطعة والمسافة وطريقة التحميل." },
      { q: "هل يمكن فك الدولاب قبل النقل؟", a: "يمكن إضافة الفك وإعادة التركيب إذا كان تصميم القطعة يحتاج ذلك لتسهيل النقل." },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { settings: COMPANY } = useCompanySettings();
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">الخدمة غير موجودة</h1>
        <Button asChild className="mt-4">
          <Link to="/services">العودة للخدمات</Link>
        </Button>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.desc,
    "provider": {
      "@type": "MovingCompany",
      "name": "مؤسسة لمس لنقل الأثاث",
      "telephone": COMPANY.phone,
    },
    "areaServed": { "@type": "City", "name": "الرياض" },
  };

  const faqSchema = service.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;

  const pageTitle = service.metaTitle || `${service.title} | مؤسسة لمس لنقل الأثاث بالرياض`;
  const pageDescription = service.metaDescription || service.desc.slice(0, 160);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={service.keywords || `${service.title}, نقل أثاث بالرياض, شركة نقل عفش, مؤسسة لمس, ${service.features.slice(0, 3).join(", ")}`} />
        <link rel="canonical" href={`https://lams.sooftit.com/services/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lams.sooftit.com/services/${slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://lams.sooftit.com/" },
            { "@type": "ListItem", "position": 2, "name": "خدماتنا", "item": "https://lams.sooftit.com/services" },
            { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://lams.sooftit.com/services/${slug}` },
          ]
        })}</script>
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <nav className="text-sm text-white/60 mb-4">
              <Link to="/" className="hover:text-secondary">الرئيسية</Link>
              {" / "}
              <Link to="/services" className="hover:text-secondary">خدماتنا</Link>
              {" / "}
              <span className="text-secondary">{service.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{service.h1}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">{service.desc}</p>
            <h2 className="text-2xl font-bold mb-6">مميزات الخدمة</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {service.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted"
                >
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>

            {service.sections?.map((section) => (
              <section key={section.h2} className="mb-10">
                <h2 className="text-2xl font-bold mb-4">{section.h2}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="text-muted-foreground leading-8 mb-4">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pr-6 space-y-2 text-muted-foreground leading-8">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    اقرأ أيضاً:{" "}
                    {section.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && " — "}
                        <Link to={l.href} className="font-bold text-primary hover:text-secondary underline underline-offset-4">{l.label}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </section>
            ))}


            {service.faq && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">أسئلة شائعة عن {service.title}</h2>
                <div className="space-y-3">
                  {service.faq.map((item) => (
                    <div key={item.q} className="rounded-xl border p-5">
                      <h3 className="font-black mb-2">{item.q}</h3>
                      <p className="text-muted-foreground leading-7">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="bg-gold-gradient rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-black text-primary mb-3">احجز خدمتك الآن</h3>
              <p className="text-primary/80 mb-6">تواصل معنا للحصول على عرض سعر مجاني</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                  <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone"><Phone className="ml-2 h-5 w-5" />اتصل الآن</a>
                </Button>
                <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#25D366]/90 font-bold">
                  <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp">
                    <MessageCircle className="ml-2 h-5 w-5" />واتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedSeoLinks
        title="أدلة ومناطق مرتبطة بالخدمة"
        links={service.relatedLinks || [
          { label: "أسعار نقل العفش بالرياض", href: "/guides/furniture-moving-prices-riyadh" },
          { label: "قائمة تجهيز المنزل قبل النقل", href: "/guides/moving-checklist-riyadh" },
          { label: "مناطق خدمة نقل الأثاث", href: "/service-areas" },
        ]}
      />
      </div>
    </>
  );
};

export default ServiceDetail;
