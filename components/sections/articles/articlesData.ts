import type { Bilingual } from "@/lib/i18n";

export interface Article {
  id: string;
  category: Bilingual;
  title: Bilingual;
  excerpt: Bilingual;
  body: Bilingual<string[]>;
  date: Bilingual;
  readTime: Bilingual;
  image: string;
}

export const articles: Article[] = [
  {
    id: "future-of-oncology-surgery",
    category: { ar: "أبحاث وتطورات", en: "Research & Advances" },
    title: {
      ar: "مستقبل جراحة الأورام: التطورات الحديثة",
      en: "The Future of Oncology Surgery: Recent Advances",
    },
    excerpt: {
      ar: "كيف غيّرت تقنيات المنظار والروبوت من شكل التدخلات الجراحية للأورام.",
      en: "How laparoscopic and robotic techniques have reshaped surgical oncology interventions.",
    },
    body: {
      ar: [
        "شهدت جراحة الأورام خلال العقد الأخير تطورًا ملحوظًا، بدءًا من دقة التشخيص وحتى أساليب التدخل الجراحي نفسها. لم يعد الهدف الوحيد هو استئصال الورم، بل أصبح الحفاظ على جودة حياة المريض جزءًا أساسيًا من أي خطة علاجية.",
        "تقنيات الجراحة بالمنظار والجراحة بمساعدة الروبوت غيّرت الكثير من المفاهيم التقليدية؛ فبدلاً من الجروح الكبيرة وفترات التعافي الطويلة، أصبح بالإمكان إجراء تدخلات دقيقة للغاية من خلال فتحات صغيرة، مع نتائج تجميلية ووظيفية أفضل بكثير.",
        "كما لعب التصوير التشخيصي المتقدم دورًا محوريًا في تحديد حدود الورم بدقة قبل الجراحة، مما يقلل من احتمالية استئصال أنسجة سليمة أو ترك أجزاء من الورم. هذا التكامل بين التشخيص الدقيق والتدخل الجراحي المتطور هو ما يميز الرعاية الحديثة لمرضى الأورام اليوم.",
        "وفي النهاية، يبقى القرار السريري للجراح، المبني على خبرة عملية وتقييم شامل لكل حالة على حدة، هو العامل الأهم في اختيار الأسلوب الجراحي الأنسب — بغض النظر عن مدى تطور الأدوات المتاحة.",
      ],
      en: [
        "Surgical oncology has advanced remarkably over the past decade, from diagnostic precision to the surgical interventions themselves. The goal is no longer just tumor removal — preserving the patient's quality of life has become a core part of every treatment plan.",
        "Laparoscopic and robotic-assisted techniques have reshaped many traditional concepts. Instead of large incisions and long recovery periods, highly precise interventions are now possible through small openings, with far better cosmetic and functional outcomes.",
        "Advanced diagnostic imaging has also played a pivotal role in accurately defining tumor margins before surgery, reducing the chance of removing healthy tissue or leaving tumor remnants behind. This integration of precise diagnostics with advanced surgical intervention is what defines modern oncology care today.",
        "Ultimately, the surgeon's clinical judgment — built on hands-on experience and a thorough evaluation of each individual case — remains the most important factor in choosing the right surgical approach, regardless of how advanced the available tools become.",
      ],
    },
    date: { ar: "١٢ سبتمبر ٢٠٢٦", en: "September 12, 2026" },
    readTime: { ar: "٦ دقائق قراءة", en: "6 min read" },
    image: "/images/treatment-team.jpg",
  },
  {
    id: "gi-early-signs",
    category: { ar: "كشف مبكر", en: "Early Detection" },
    title: { ar: "5 علامات مبكرة لأورام الجهاز الهضمي", en: "5 Early Signs of GI Tumors" },
    excerpt: {
      ar: "تعرف على العلامات التي تستدعي زيارة الطبيب مبكرًا.",
      en: "Learn the warning signs that call for an early doctor visit.",
    },
    body: {
      ar: [
        "غالبًا ما تبدأ أورام الجهاز الهضمي بأعراض بسيطة يسهل تجاهلها أو ربطها بمشكلات هضمية شائعة، وهو ما يؤخر أحيانًا التشخيص المبكر. معرفة هذه العلامات والتعامل معها بجدية خطوة أساسية في رحلة العلاج.",
        "من أبرز هذه العلامات: تغير مفاجئ وغير مبرر في عادات التبرز يستمر لأكثر من أسبوعين، فقدان وزن ملحوظ دون سبب واضح، الشعور المستمر بالتخمة أو الامتلاء حتى بعد تناول كميات قليلة من الطعام، وجود دم في البراز أو تغير لونه إلى الأسود الداكن.",
        "العلامة الخامسة، وهي الألم المستمر في منطقة البطن الذي لا يزول مع الوقت أو يزداد سوءًا، تستحق اهتمامًا خاصًا خاصة إذا صاحبته أي من العلامات السابقة.",
        "ظهور علامة واحدة أو أكثر من هذه العلامات لا يعني بالضرورة وجود ورم، لكنه يستدعي استشارة طبيب مختص لإجراء الفحوصات اللازمة والاطمئنان مبكرًا.",
      ],
      en: [
        "GI tumors often begin with subtle symptoms that are easy to dismiss or attribute to common digestive issues, which can sometimes delay early diagnosis. Recognizing these signs and taking them seriously is a critical first step in the treatment journey.",
        "Key warning signs include: a sudden, unexplained change in bowel habits lasting more than two weeks, noticeable weight loss without a clear cause, a persistent feeling of fullness even after eating small amounts, and blood in the stool or stool that turns dark black.",
        "The fifth sign — persistent abdominal pain that doesn't go away or worsens over time — deserves particular attention, especially when accompanied by any of the signs above.",
        "Having one or more of these signs doesn't necessarily mean a tumor is present, but it does warrant a visit to a specialist for the appropriate tests and early peace of mind.",
      ],
    },
    date: { ar: "٥ سبتمبر ٢٠٢٦", en: "September 5, 2026" },
    readTime: { ar: "٣ دقائق قراءة", en: "3 min read" },
    image: "/images/article-gi-health.jpg",
  },
  {
    id: "nutrition-during-treatment",
    category: { ar: "تغذية", en: "Nutrition" },
    title: { ar: "التغذية السليمة أثناء العلاج", en: "Proper Nutrition During Treatment" },
    excerpt: {
      ar: "دليل عملي لدعم جسمك أثناء رحلة العلاج.",
      en: "A practical guide to supporting your body through treatment.",
    },
    body: {
      ar: [
        "التغذية السليمة ليست تفصيلة ثانوية في رحلة علاج الأورام، بل عنصر أساسي يدعم قدرة الجسم على التعافي ومواجهة متطلبات العلاج، سواء كان جراحيًا أو كيميائيًا أو إشعاعيًا.",
        "من المهم التركيز على البروتين عالي الجودة (كاللحوم والبيض والبقوليات) لدعم بناء الأنسجة وتعويض ما يفقده الجسم، بالإضافة إلى الخضروات والفواكه الطازجة الغنية بمضادات الأكسدة والفيتامينات.",
        "قد يواجه بعض المرضى صعوبة في الأكل بسبب فقدان الشهية أو الغثيان؛ في هذه الحالات، يُفضّل تناول وجبات صغيرة ومتكررة بدلاً من ثلاث وجبات كبيرة، مع الحرص على شرب كميات كافية من السوائل على مدار اليوم.",
        "يُنصح دائمًا بمناقشة النظام الغذائي مع الطبيب المعالج أو أخصائي تغذية متخصص، خاصة عند التفكير في أي مكملات غذائية، لضمان توافقها مع خطة العلاج ولتفادي أي تعارض غير مرغوب.",
      ],
      en: [
        "Proper nutrition isn't a minor detail in the cancer treatment journey — it's a core element that supports the body's ability to recover and cope with the demands of treatment, whether surgical, chemotherapy, or radiation.",
        "It's important to focus on high-quality protein (meat, eggs, legumes) to support tissue repair and replace what the body loses, along with fresh vegetables and fruits rich in antioxidants and vitamins.",
        "Some patients may struggle to eat due to loss of appetite or nausea. In these cases, smaller, more frequent meals are preferable to three large ones, along with drinking enough fluids throughout the day.",
        "It's always advisable to discuss your diet with your treating physician or a specialized nutritionist, especially before considering any supplements, to ensure they align with the treatment plan and avoid unwanted interactions.",
      ],
    },
    date: { ar: "٢٨ أغسطس ٢٠٢٦", en: "August 28, 2026" },
    readTime: { ar: "٤ دقائق قراءة", en: "4 min read" },
    image: "/images/article-nutrition.jpg",
  },
  {
    id: "questions-before-surgery",
    category: { ar: "تحضير جراحي", en: "Surgical Prep" },
    title: { ar: "أسئلة شائعة قبل الجراحة", en: "Common Questions Before Surgery" },
    excerpt: {
      ar: "إجابات واضحة تساعدك على الاستعداد النفسي والجسدي.",
      en: "Clear answers to help you prepare, mentally and physically.",
    },
    body: {
      ar: [
        "من الطبيعي أن يشعر أي مريض بالقلق قبل الخضوع لجراحة، خاصة عند التعامل مع تشخيص ورم. لكن الفهم الواضح لما سيحدث قبل وأثناء وبعد العملية يقلل كثيرًا من هذا التوتر.",
        "من أكثر الأسئلة شيوعًا: كم من الوقت سأحتاج للتعافي؟ وهل ستكون هناك ندبة واضحة؟ وهل سأحتاج لعلاج إضافي بعد الجراحة؟ الإجابات تختلف حسب نوع الورم ومرحلته وحالة المريض الصحية العامة، ولهذا فإن جلسة الاستشارة قبل الجراحة فرصة مهمة لطرح كل هذه التساؤلات بصراحة.",
        "من المفيد أيضًا الاستفسار عن التحضيرات المطلوبة، مثل الفحوصات اللازمة، والأدوية التي يجب التوقف عنها مؤقتًا، وموعد آخر وجبة قبل التخدير، لضمان سير العملية دون أي تعقيدات غير متوقعة.",
        "تذكّر دائمًا أن لا سؤال «بسيط جدًا» ليُطرح — التواصل المفتوح مع فريقك الطبي هو أساس الشعور بالثقة والاطمئنان قبل يوم الجراحة.",
      ],
      en: [
        "It's completely natural to feel anxious before undergoing surgery, especially when dealing with a tumor diagnosis. A clear understanding of what will happen before, during, and after the procedure goes a long way toward easing that anxiety.",
        "Among the most common questions: How long will recovery take? Will there be a visible scar? Will I need additional treatment after surgery? The answers vary depending on tumor type, stage, and the patient's overall health — which is why the pre-surgery consultation is an important opportunity to ask all of these questions openly.",
        "It's also worth asking about required preparations, such as necessary tests, medications to temporarily stop, and the timing of your last meal before anesthesia, to ensure the procedure goes smoothly without unexpected complications.",
        "Remember: no question is ever 'too simple' to ask. Open communication with your medical team is the foundation of feeling confident and at ease before surgery day.",
      ],
    },
    date: { ar: "٢٠ أغسطس ٢٠٢٦", en: "August 20, 2026" },
    readTime: { ar: "٥ دقائق قراءة", en: "5 min read" },
    image: "/images/article-presurgery.jpg",
  },
  {
    id: "self-exams-importance",
    category: { ar: "كشف مبكر", en: "Early Detection" },
    title: { ar: "الفحص الذاتي وأهمية الكشف المبكر", en: "Self-Exams & the Importance of Early Detection" },
    excerpt: {
      ar: "عادة بسيطة قد تُحدث فرقًا كبيرًا في نتائج العلاج.",
      en: "A simple habit that can make a real difference in treatment outcomes.",
    },
    body: {
      ar: [
        "يُعد الكشف المبكر أحد أهم العوامل التي تحدد نجاح علاج الأورام؛ فكلما اكتُشف الورم في مرحلة مبكرة، زادت فرص الشفاء الكامل وقلّت الحاجة إلى تدخلات جراحية موسّعة.",
        "الفحص الذاتي الدوري، خاصة لأورام الثدي، عادة بسيطة يمكن لأي شخص تعلمها وممارستها بانتظام في المنزل. الهدف ليس التشخيص الذاتي، بل التعرف على الشكل الطبيعي للجسم بحيث يسهل ملاحظة أي تغيير غير معتاد مبكرًا.",
        "بجانب الفحص الذاتي، يبقى الفحص الدوري لدى طبيب متخصص والالتزام بمواعيد الأشعة التصويرية الموصى بها حسب العمر والتاريخ العائلي خط الدفاع الأهم، لأنه يكشف تغيرات قد لا تظهر أو تُلاحظ في الفحص الذاتي وحده.",
        "لا تنتظر ظهور أعراض واضحة لتبدأ الاهتمام بالكشف المبكر — اجعله جزءًا من روتينك الصحي المنتظم.",
      ],
      en: [
        "Early detection is one of the most important factors determining the success of cancer treatment; the earlier a tumor is found, the higher the chances of full recovery and the less need for extensive surgical intervention.",
        "Regular self-exams, especially for breast tumors, are a simple habit anyone can learn and practice at home. The goal isn't self-diagnosis — it's becoming familiar with your body's normal state so any unusual change is noticed early.",
        "Alongside self-exams, regular check-ups with a specialist and keeping up with recommended imaging screenings based on age and family history remain the most important line of defense, as they can catch changes that self-exams alone might miss.",
        "Don't wait for obvious symptoms to start caring about early detection — make it part of your regular health routine.",
      ],
    },
    date: { ar: "١٢ أغسطس ٢٠٢٦", en: "August 12, 2026" },
    readTime: { ar: "٤ دقائق قراءة", en: "4 min read" },
    image: "/images/surgery-breast.jpg",
  },
  {
    id: "understanding-pathology-report",
    category: { ar: "تشخيص", en: "Diagnosis" },
    title: { ar: "فهم التقرير المرضي بعد الجراحة", en: "Understanding Your Pathology Report" },
    excerpt: {
      ar: "دليل مبسط لقراءة أهم بنود التقرير دون تعقيد.",
      en: "A simplified guide to the key sections of your report, explained clearly.",
    },
    body: {
      ar: [
        "بعد أي جراحة لاستئصال ورم، تُرسل العينة إلى المختبر لتحليلها بدقة، وتظهر النتائج في تقرير يُعرف بـ«التقرير المرضي». قد تبدو لغة هذا التقرير معقدة للوهلة الأولى، لكن فهم بنوده الأساسية يساعد المريض على المشاركة الفعّالة في قرارات علاجه.",
        "من أهم البنود: نوع الورم ودرجته (Grade)، والتي تصف مدى تشابه خلايا الورم بالخلايا الطبيعية، وحجم الورم، وحالة «هوامش الاستئصال» (Margins) التي تشير إلى ما إذا كانت كل الأنسجة السرطانية قد أُزيلت بالكامل.",
        "كما يتضمن التقرير غالبًا معلومات عن الغدد الليمفاوية المجاورة، وما إذا كان هناك انتشار للورم إليها، وهي معلومة حاسمة في تحديد مرحلة المرض (Staging) والحاجة إلى علاج إضافي بعد الجراحة.",
        "الطبيب المعالج هو الأقدر على شرح هذا التقرير بالتفصيل وربط نتائجه بخطة العلاج القادمة، ولا حرج أبدًا في طلب توضيح أي مصطلح غير مفهوم.",
      ],
      en: [
        "After any tumor-removal surgery, the sample is sent to a lab for detailed analysis, and the results appear in what's known as a 'pathology report.' The language can seem complex at first, but understanding its key sections helps patients take an active role in their treatment decisions.",
        "Key sections include: the tumor's type and grade — which describes how closely the tumor cells resemble normal cells — its size, and the status of the 'margins,' indicating whether all cancerous tissue was fully removed.",
        "The report also typically includes information about nearby lymph nodes and whether the tumor has spread to them — a crucial factor in determining the disease stage and the need for further treatment after surgery.",
        "Your treating physician is best placed to walk through this report in detail and connect its findings to your upcoming treatment plan — there's never any harm in asking for any term to be clarified.",
      ],
    },
    date: { ar: "٣ أغسطس ٢٠٢٦", en: "August 3, 2026" },
    readTime: { ar: "٥ دقائق قراءة", en: "5 min read" },
    image: "/images/treatment-diagnosis.jpg",
  },
  {
    id: "life-after-recovery",
    category: { ar: "تعافي", en: "Recovery" },
    title: { ar: "الحياة بعد التعافي: العودة للحياة الطبيعية", en: "Life After Recovery: Returning to Normal" },
    excerpt: {
      ar: "خطوات عملية للانتقال بثقة إلى مرحلة ما بعد العلاج.",
      en: "Practical steps for confidently transitioning into life after treatment.",
    },
    body: {
      ar: [
        "الوصول إلى مرحلة التعافي الكامل بعد رحلة علاج طويلة إنجاز كبير، لكنه غالبًا ما يأتي مصحوبًا بمشاعر مختلطة — فرح بانتهاء العلاج، وفي الوقت نفسه قلق من العودة إلى الحياة «الطبيعية» بعد كل ما مرّ به المريض.",
        "من المهم منح النفس الوقت الكافي للتكيف، دون ضغط لاستعادة كل شيء دفعة واحدة. العودة التدريجية للنشاط البدني، وممارسة الرياضة الخفيفة بعد استشارة الطبيب، تساعدان الجسم على استعادة قوته تدريجيًا.",
        "المتابعة الدورية بعد انتهاء العلاج لا تقل أهمية عن العلاج نفسه؛ فهي تضمن رصد أي تغيرات مبكرًا وتمنح المريض راحة نفسية بمعرفة أن حالته تحت المتابعة المستمرة.",
        "وأخيرًا، الدعم النفسي والاجتماعي من العائلة والأصدقاء، أو حتى من مجموعات دعم متخصصة، يلعب دورًا لا يقل أهمية عن الرعاية الطبية في تسهيل هذه المرحلة الجديدة من الحياة.",
      ],
      en: [
        "Reaching full recovery after a long treatment journey is a major milestone, but it often comes with mixed emotions — joy that treatment has ended, alongside anxiety about returning to 'normal' life after everything the patient has been through.",
        "It's important to give yourself enough time to adjust, without pressure to get everything back at once. Gradually returning to physical activity, and light exercise after consulting your doctor, helps the body regain its strength over time.",
        "Regular follow-up after treatment ends is just as important as the treatment itself — it ensures any changes are caught early and gives patients peace of mind knowing their condition is being continuously monitored.",
        "Finally, emotional and social support from family, friends, or even specialized support groups plays a role that's just as important as medical care in easing this new chapter of life.",
      ],
    },
    date: { ar: "٢٥ يوليو ٢٠٢٦", en: "July 25, 2026" },
    readTime: { ar: "٤ دقائق قراءة", en: "4 min read" },
    image: "/images/treatment-followup.jpg",
  },
];
