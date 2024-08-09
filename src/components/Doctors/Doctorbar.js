import DoctorItem from './DoctorItem';

const doctors = [
  {
      id: 1,
      name: 'دكتور ادهم سالم',
      specialty: 'اخصائي جراحة الفم والأسنان بجامعة القاهرة',
      description: 'دكتور اسنان متخصص في تجميل اسنان وحشو علاج الجذور والاعصاب وعلاج اللثة وجراحة وجه وفكين',
      fee: '150 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: true
  },
  {
      id: 2,
      name: 'دكتور محمد علي',
      specialty: 'اخصائي طب الأطفال بجامعة عين شمس',
      description: 'دكتور متخصص في طب الأطفال وحديثي الولادة',
      fee: '200 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: false
  },
  {
      id: 3,
      name: 'دكتور ياسمين عبد الله',
      specialty: 'اخصائية أمراض القلب بجامعة القاهرة',
      description: 'دكتورة متخصصة في علاج أمراض القلب والشرايين',
      fee: '250 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: false
  },
  {
      id: 4,
      name: 'دكتور أحمد سامي',
      specialty: 'اخصائي طب العيون بجامعة المنصورة',
      description: 'دكتور متخصص في علاج أمراض العيون وجراحاتها',
      fee: '180 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 3,
      new: true
  },
  {
      id: 5,
      name: 'دكتور خالد مصطفى',
      specialty: 'اخصائي الأمراض الجلدية بجامعة الزقازيق',
      description: 'دكتور متخصص في علاج الأمراض الجلدية والتجميل',
      fee: '220 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: false
  },
  {
      id: 6,
      name: 'دكتورة ليلى حسن',
      specialty: 'اخصائية نساء وتوليد بجامعة الإسكندرية',
      description: 'دكتورة متخصصة في طب النساء والتوليد والعقم',
      fee: '300 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: true
  },
  {
      id: 7,
      name: 'دكتور عمرو إبراهيم',
      specialty: 'اخصائي جراحة العظام بجامعة أسيوط',
      description: 'دكتور متخصص في جراحة العظام والمفاصل',
      fee: '190 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 3,
      new: false
  },
  {
      id: 8,
      name: 'دكتور هاني مراد',
      specialty: 'اخصائي طب النفس بجامعة الأزهر',
      description: 'دكتور متخصص في علاج الأمراض النفسية والعصبية',
      fee: '210 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: true
  },
  {
      id: 9,
      name: 'دكتورة سارة محمود',
      specialty: 'اخصائية التغذية العلاجية بجامعة طنطا',
      description: 'دكتورة متخصصة في التغذية العلاجية وإنقاص الوزن',
      fee: '170 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: false
  },
  {
      id: 10,
      name: 'دكتور مصطفى عبد الفتاح',
      specialty: 'اخصائي علاج طبيعي بجامعة حلوان',
      description: 'دكتور متخصص في العلاج الطبيعي والتأهيل الرياضي',
      fee: '230 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 3,
      new: true
  },
  {
      id: 11,
      name: 'دكتور نور الدين حسن',
      specialty: 'اخصائي أمراض الباطنة بجامعة قناة السويس',
      description: 'دكتور متخصص في علاج أمراض الباطنة والكبد',
      fee: '200 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: false
  },
  {
      id: 12,
      name: 'دكتورة منى علاء',
      specialty: 'اخصائية طب الأسرة بجامعة بني سويف',
      description: 'دكتورة متخصصة في طب الأسرة والرعاية الأولية',
      fee: '160 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: true
  },
  {
      id: 13,
      name: 'دكتور سعيد أحمد',
      specialty: 'اخصائي جراحة المخ والأعصاب بجامعة المنوفية',
      description: 'دكتور متخصص في جراحة المخ والأعصاب والعمود الفقري',
      fee: '270 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: false
  },
  {
      id: 14,
      name: 'دكتور نادر حسن',
      specialty: 'اخصائي الأمراض الصدرية بجامعة سوهاج',
      description: 'دكتور متخصص في علاج الأمراض الصدرية والحساسية',
      fee: '180 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 3,
      new: true
  },
  {
      id: 15,
      name: 'دكتورة هبة علاء',
      specialty: 'اخصائية طب العيون بجامعة بورسعيد',
      description: 'دكتورة متخصصة في علاج أمراض العيون وجراحاتها',
      fee: '220 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: false
  },
  {
      id: 16,
      name: 'دكتور يوسف سالم',
      specialty: 'اخصائي أمراض الكلى بجامعة الفيوم',
      description: 'دكتور متخصص في علاج أمراض الكلى وزراعة الكلى',
      fee: '250 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: true
  },
  {
      id: 17,
      name: 'دكتور إبراهيم محمد',
      specialty: 'اخصائي الجراحة العامة بجامعة المنيا',
      description: 'دكتور متخصص في الجراحة العامة وجراحة المناظير',
      fee: '190 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 3,
      new: false
  },
  {
      id: 18,
      name: 'دكتورة فاطمة عبد الله',
      specialty: 'اخصائية طب الأسنان بجامعة دمنهور',
      description: 'دكتورة متخصصة في تجميل الأسنان وتقويمها',
      fee: '200 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: true
  },
  {
      id: 19,
      name: 'دكتور طارق سعيد',
      specialty: 'اخصائي الأمراض النفسية بجامعة دمياط',
      description: 'دكتور متخصص في علاج الأمراض النفسية والإدمان',
      fee: '210 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 5,
      new: false
  },
  {
      id: 20,
      name: 'دكتورة نجلاء حسن',
      specialty: 'اخصائية الطب الطبيعي بجامعة بنها',
      description: 'دكتورة متخصصة في الطب الطبيعي وإعادة التأهيل',
      fee: '230 جنيه',
      imageUrl: '/doctooor.jpg',
      rating: 4,
      new: true
  }
];
const DoctorBar = () => {
    return (
        <div className="w-full bg-slate-300">
            <div className="md:w-[60%] w-full m-auto flex flex-col pb-3">
                <div className='flex justify-between mx-5 mt-10 mb-5'>
                    <div className='font-bold text-2xl text-slate-700'>كل التخصصات</div>
                    <div className='text- text-slate-700'>ترتيب :</div>
                </div>
                {doctors.slice(0,10).map((doctor) => (
                    <DoctorItem key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}

export default DoctorBar;
