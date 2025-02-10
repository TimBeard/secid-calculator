import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ClassSelector from '../class-selector.vue'

describe('class-selector.vue', () => {
    it('should render the class selector component', () => {
        const wrapper = mount(ClassSelector, {
            props: {
                modelValue: -1,
            },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('should render the correct number of options', () => {
        const wrapper = mount(ClassSelector, {
            props: {
                modelValue: -1,
            },
        })
        const options = wrapper.findAll('option')

        expect(options.length).toBe(13)
    })

    it('should update the model value when an option is selected', async () => {
        const wrapper = mount(ClassSelector, {
            props: {
                modelValue: -1,
                'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
            },
        })

        const select = wrapper.find('select')
        await select.setValue('1') // Set to a valid option value

        expect(wrapper.props('modelValue')).toBe(1) // Ensure the model value is updated
    })

    it('should disable the default option', () => {
        const wrapper = mount(ClassSelector, {
            props: {
                modelValue: -1,
            },
        })
        const defaultOption = wrapper.find('option:disabled')
        expect(defaultOption.exists()).toBe(true)
        expect(defaultOption.text()).toBe('Select')
    })
})
