import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FormField from '../FormField.vue'

// Mock Lucide icons
vi.mock('lucide-vue-next', () => ({
  CheckCircle: { name: 'CheckCircle', template: '<div class="mock-check-circle"></div>' },
  XCircle: { name: 'XCircle', template: '<div class="mock-x-circle"></div>' },
  AlertCircle: { name: 'AlertCircle', template: '<div class="mock-alert-circle"></div>' }
}))

describe('FormField', () => {
  const defaultProps = {
    name: 'testField',
    label: 'Test Field'
  }

  describe('text input rendering', () => {
    it('should render text input by default', () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const input = wrapper.find('input[type="text"]')
      expect(input.exists()).toBe(true)
      expect(input.attributes('name')).toBe('testField')
    })

    it('should render label when provided', () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('Test Field')
    })

    it('should show required asterisk for required fields', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, required: true }
      })
      
      const label = wrapper.find('label')
      expect(label.classes()).toContain('required')
    })

    it('should render placeholder', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, placeholder: 'Enter text here' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Enter text here')
    })
  })

  describe('different input types', () => {
    it('should render email input', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, type: 'email' }
      })
      
      const input = wrapper.find('input[type="email"]')
      expect(input.exists()).toBe(true)
    })

    it('should render textarea', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, type: 'textarea', rows: 5 }
      })
      
      const textarea = wrapper.find('textarea')
      expect(textarea.exists()).toBe(true)
      expect(textarea.attributes('rows')).toBe('5')
    })

    it('should render select with options', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]

      const wrapper = mount(FormField, { 
        props: { ...defaultProps, type: 'select', options }
      })
      
      const select = wrapper.find('select')
      expect(select.exists()).toBe(true)
      
      const optionElements = wrapper.findAll('option')
      expect(optionElements).toHaveLength(2)
      expect(optionElements[0].text()).toBe('Option 1')
      expect(optionElements[1].text()).toBe('Option 2')
    })

    it('should render checkbox', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, type: 'checkbox', checkboxLabel: 'Check me' }
      })
      
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.exists()).toBe(true)
      
      const label = wrapper.find('label[for]')
      expect(label.text()).toBe('Check me')
    })
  })

  describe('validation states', () => {
    it('should show error state', async () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, error: 'This field is required' }
      })
      
      const input = wrapper.find('input')
      expect(input.classes()).toContain('border-red-500')
      
      const errorMessage = wrapper.find('.text-red-600')
      expect(errorMessage.exists()).toBe(true)
      expect(errorMessage.text()).toContain('This field is required')
      
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('should show success state', () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          showSuccess: true, 
          modelValue: 'Some value' 
        }
      })
      
      const input = wrapper.find('input')
      expect(input.classes()).toContain('border-green-500')
    })

    it('should show status icons when enabled', () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          error: 'Error message',
          showStatusIcon: true
        }
      })
      
      const errorIcon = wrapper.find('.mock-x-circle')
      expect(errorIcon.exists()).toBe(true)
    })
  })

  describe('v-model binding', () => {
    it('should emit update:modelValue on input', async () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const input = wrapper.find('input')
      await input.setValue('test value')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
    })

    it('should emit input event', async () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const input = wrapper.find('input')
      await input.setValue('test value')
      
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')?.[0]).toEqual(['test value'])
    })

    it('should react to modelValue prop changes', async () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, modelValue: 'initial' }
      })
      
      let input = wrapper.find('input')
      expect(input.element.value).toBe('initial')
      
      await wrapper.setProps({ modelValue: 'updated' })
      input = wrapper.find('input')
      expect(input.element.value).toBe('updated')
    })
  })

  describe('event handling', () => {
    it('should emit focus event', async () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const input = wrapper.find('input')
      await input.trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('should emit blur event', async () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const input = wrapper.find('input')
      await input.trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('should emit validate on blur when validateOnBlur is true', async () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, validateOnBlur: true }
      })
      
      const input = wrapper.find('input')
      await input.trigger('blur')
      
      expect(wrapper.emitted('validate')).toBeTruthy()
    })

    it('should emit validate on input when validateOnInput is true', async () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, validateOnInput: true }
      })
      
      const input = wrapper.find('input')
      await input.setValue('test')
      
      expect(wrapper.emitted('validate')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, error: 'Error message' }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('aria-describedby')).toContain('error')
    })

    it('should associate label with input', () => {
      const wrapper = mount(FormField, { props: defaultProps })
      
      const label = wrapper.find('label')
      const input = wrapper.find('input')
      
      const labelFor = label.attributes('for')
      const inputId = input.attributes('id')
      
      expect(labelFor).toBe(inputId)
      expect(inputId).toBeTruthy()
    })
  })

  describe('help text', () => {
    it('should show help text at bottom by default', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, helpText: 'This is helpful text' }
      })
      
      const helpText = wrapper.find('.text-gray-500')
      expect(helpText.exists()).toBe(true)
      expect(helpText.text()).toBe('This is helpful text')
    })

    it('should show help text at top when specified', () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          helpText: 'This is helpful text',
          helpPosition: 'top'
        }
      })
      
      // Should appear before input
      const allText = wrapper.find('.text-gray-500')
      expect(allText.exists()).toBe(true)
    })

    it('should hide help text when error is shown', () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          helpText: 'Help text',
          error: 'Error message'
        }
      })
      
      const helpTexts = wrapper.findAll('.text-gray-500')
      const helpText = helpTexts.find(el => el.text() === 'Help text')
      expect(helpText).toBeFalsy()
    })
  })

  describe('character counter', () => {
    it('should show character counter when enabled', async () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          showCharCounter: true, 
          maxLength: 100,
          modelValue: 'Hello'
        }
      })
      
      const counter = wrapper.find('.text-xs')
      expect(counter.exists()).toBe(true)
      expect(counter.text()).toContain('5 / 100')
    })

    it('should change color when approaching limit', async () => {
      const wrapper = mount(FormField, { 
        props: { 
          ...defaultProps, 
          showCharCounter: true, 
          maxLength: 10,
          modelValue: '1234567890' // 10 chars = 100%
        }
      })
      
      const counter = wrapper.find('.text-red-600')
      expect(counter.exists()).toBe(true)
    })
  })

  describe('disabled and readonly states', () => {
    it('should disable input when disabled prop is true', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, disabled: true }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('disabled')).toBeDefined()
      expect(input.classes()).toContain('cursor-not-allowed')
    })

    it('should make input readonly when readonly prop is true', () => {
      const wrapper = mount(FormField, { 
        props: { ...defaultProps, readonly: true }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('readonly')).toBeDefined()
    })
  })
})