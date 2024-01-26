import { mount } from '@vue/test-utils'
import DataRow from "../DataTable/DataRow.vue";


describe('HelloWorld', () => {
    it('should display header text', () => {
        const msg = 'Beszerezve'
        const wrapper = mount(DataRow, {
            props: {
                modelValue: {
                    name: 'test-prod',
                    price: '100',
                    description: 'test-desc'
                }
            }
        })

        expect(wrapper.find('td:nth-child(4) span').text()).toEqual(msg)
    })
})