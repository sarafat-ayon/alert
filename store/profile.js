const state = () => ({
    show: false,
    getCountryCode: [
        { code: '+1', value: '+1' },
        // { code: '+2', value: '+2' },
        { code: '+880', value: '+880' },
        /* { code: '+7', value: '+7' },
        { code: '+20', value: '+20' },
        { code: '+27', value: '+27' },
        { code: '+30', value: '+30' },
        { code: '+32', value: '+32' },
        { code: '+33', value: '+33' },
        { code: '+34', value: '+34' },
        { code: '+36', value: '+36' },
        { code: '+39', value: '+39' },
        { code: '+40', value: '+40' },
        { code: '+41', value: '+41' },
        { code: '+43', value: '+43' },
        { code: '+44', value: '+44' },
        { code: '+45', value: '+45' },
        { code: '+46', value: '+46' },
        { code: '+47', value: '+47' },
        { code: '+48', value: '+48' },
        { code: '+51', value: '+51' },
        { code: '+52', value: '+52' },
        { code: '+53', value: '+53' },
        { code: '+54', value: '+54' },
        { code: '+55', value: '+55' },
        { code: '+56', value: '+56' },
        { code: '+57', value: '+57' },
        { code: '+58', value: '+58' },
        { code: '+60', value: '+60' },
        { code: '+61', value: '+61' },
        { code: '+62', value: '+62' },
        { code: '+63', value: '+63' },
        { code: '+64', value: '+64' },
        { code: '+65', value: '+65' },
        { code: '+66', value: '+66' },
        { code: '+81', value: '+81' },
        { code: '+82', value: '+82' },
        { code: '+84', value: '+84' },
        { code: '+86', value: '+86' },
        { code: '+90', value: '+90' },
        { code: '+91', value: '+91' },
        { code: '+92', value: '+92' },
        { code: '+93', value: '+93' },
        { code: '+94', value: '+94' },
        { code: '+95', value: '+95' },
        { code: '+98', value: '+98' },
        { code: '+211', value: '+211' },
        { code: '+212', value: '+212' },
        { code: '+213', value: '+213' },
        { code: '+216', value: '+216' },
        { code: '+218', value: '+218' },
        { code: '+220', value: '+220' },
        { code: '+221', value: '+221' },
        { code: '+222', value: '+222' },
        { code: '+223', value: '+223' },
        { code: '+224', value: '+224' },
        { code: '+225', value: '+225' },
        { code: '+226', value: '+226' },
        { code: '+227', value: '+227' },
        { code: '+230', value: '+230' },
        { code: '+231', value: '+231' },
        { code: '+232', value: '+232' },
        { code: '+233', value: '+233' },
        { code: '+234', value: '+234' },
        { code: '+235', value: '+235' },
        { code: '+237', value: '+237' },
        { code: '+238', value: '+238' },
        { code: '+239', value: '+239' },
        { code: '+240', value: '+240' },
        { code: '+241', value: '+241' },
        { code: '+242', value: '+242' },
        { code: '+243', value: '+243' },
        { code: '+244', value: '+244' },
        { code: '+245', value: '+245' },
        { code: '+248', value: '+248' },
        { code: '+249', value: '+249' },
        { code: '+250', value: '+250' },
        { code: '+251', value: '+251' },
        { code: '+252', value: '+252' },
        { code: '+254', value: '+254' },
        { code: '+255', value: '+255' },
        { code: '+256', value: '+256' },
        { code: '+257', value: '+257' },
        { code: '+258', value: '+258' },
        { code: '+260', value: '+260' },
        { code: '+261', value: '+261' },
        { code: '+262', value: '+262' },
        { code: '+263', value: '+263' },
        { code: '+264', value: '+264' },
        { code: '+265', value: '+265' },
        { code: '+266', value: '+266' },
        { code: '+267', value: '+267' },
        { code: '+268', value: '+268' },
        { code: '+269', value: '+269' },
        { code: '+288', value: '+288' },
        { code: '+298', value: '+298' },
        { code: '+299', value: '+299' },
        { code: '+350', value: '+350' },
        { code: '+351', value: '+351' },
        { code: '+352', value: '+352' },
        { code: '+353', value: '+353' },
        { code: '+354', value: '+354' },
        { code: '+355', value: '+355' },
        { code: '+356', value: '+356' },
        { code: '+357', value: '+357' },
        { code: '+358', value: '+358' },
        { code: '+359', value: '+359' },
        { code: '+370', value: '+370' },
        { code: '+371', value: '+371' },
        { code: '+372', value: '+372' },
        { code: '+373', value: '+373' },
        { code: '+374', value: '+374' },
        { code: '+375', value: '+375' },
        { code: '+376', value: '+376' },
        { code: '+377', value: '+377' },
        { code: '+378', value: '+378' },
        { code: '+380', value: '+380' },
        { code: '+381', value: '+381' },
        { code: '+382', value: '+382' },
        { code: '+383', value: '+383' },
        { code: '+385', value: '+385' },
        { code: '+386', value: '+386' },
        { code: '+387', value: '+387' },
        { code: '+389', value: '+389' },
        { code: '+420', value: '+420' },
        { code: '+421', value: '+421' },
        { code: '+423', value: '+423' },
        { code: '+501', value: '+501' },
        { code: '+502', value: '+502' },
        { code: '+503', value: '+503' },
        { code: '+504', value: '+504' },
        { code: '+505', value: '+505' },
        { code: '+506', value: '+506' },
        { code: '+507', value: '+507' },
        { code: '+508', value: '+508' },
        { code: '+509', value: '+509' },
        { code: '+591', value: '+591' },
        { code: '+592', value: '+592' },
        { code: '+593', value: '+593' },
        { code: '+594', value: '+594' },
        { code: '+595', value: '+595' },
        { code: '+596', value: '+596' },
        { code: '+597', value: '+597' },
        { code: '+598', value: '+598' },
        { code: '+599', value: '+599' },
        { code: '+614', value: '+614' },
        { code: '+670', value: '+670' },
        { code: '+621', value: '+621' },
        { code: '+672', value: '+672' },
        { code: '+673', value: '+673' },
        { code: '+675', value: '+675' },
        { code: '+676', value: '+676' },
        { code: '+678', value: '+678' },
        { code: '+679', value: '+679' },
        { code: '+682', value: '+682' },
        { code: '+683', value: '+683' },
        { code: '+685', value: '+685' },
        { code: '+687', value: '+687' },
        { code: '+688', value: '+688' },
        { code: '+689', value: '+689' },
        { code: '+691', value: '+691' },
        { code: '+692', value: '+692' },
        { code: '+852', value: '+852' },
        { code: '+853', value: '+853' },
        { code: '+855', value: '+855' },
        { code: '+856', value: '+856' },
        { code: '+880', value: '+880' },
        { code: '+886', value: '+886' },
        { code: '+960', value: '+960' },
        { code: '+961', value: '+961' },
        { code: '+962', value: '+962' },
        { code: '+963', value: '+963' },
        { code: '+964', value: '+964' },
        { code: '+965', value: '+965' },
        { code: '+967', value: '+967' },
        { code: '+968', value: '+968' },
        { code: '+670', value: '+670' },
        { code: '+971', value: '+971' },
        { code: '+972', value: '+972' },
        { code: '+973', value: '+973' },
        { code: '+974', value: '+974' },
        { code: '+975', value: '+975' },
        { code: '+976', value: '+976' },
        { code: '+977', value: '+977' },
        { code: '+992', value: '+992' },
        { code: '+994', value: '+994' },
        { code: '+995', value: '+995' },
        { code: '+996', value: '+996' },
        { code: '+998', value: '+998' },
        { code: '+1242', value: '+1242' },
        { code: '+1246', value: '+1246' },
        { code: '+1264', value: '+1264' },
        { code: '+1268', value: '+1268' },
        { code: '+1284', value: '+1284' },
        { code: '+1340', value: '+1340' },
        { code: '+1345', value: '+1345' },
        { code: '+1441', value: '+1441' },
        { code: '+1473', value: '+1473' },
        { code: '+1664', value: '+1664' },
        { code: '+1671', value: '+1671' },
        { code: '+1684', value: '+1684' },
        { code: '+1767', value: '+1767' },
        { code: '+1784', value: '+1784' },
        { code: '+1829', value: '+1829' },
        { code: '+1868', value: '+1868' },
        { code: '+1876', value: '+1876' }, */
    ]
})

const getters = {
    getCodeCountry(state) {
        return state.getCountryCode
    }
}

const mutations = {
    SET_PROFILE_MODAL(state, payload) {
        state.show = payload
    },
    SET_COUNTRY_CODE(state, payload) {
        state.getCountryCode = payload
    }
}

const actions = {
    setCountryCode({ commit }, payload) {
        commit('SET_COUNTRY_CODE', payload)
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}