import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import SearchInput from '@/components/SearchInput.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('SearchInput', () => {
  test('should mount', () => {
    const wrapper = mount(SearchInput, {
      localVue,
      propsData: {
        searchId: 'test-id'
      }
    })
    expect(wrapper.vm).toBeTruthy()
  }),
  test('should have the correct placeholder', () => {
    const wrapper = mount(SearchInput, {
      localVue,
      propsData: {
        searchPlaceholder: 'Enter your search',
        searchId: 'test-id'
      }
    })
    const searchPlaceholder = wrapper.find('input').attributes('placeholder');

    expect(searchPlaceholder).toEqual('Enter your search');
  }),
  test('should have the correct label', () => {
    const wrapper = mount(SearchInput, {
      localVue,
      propsData: {
        searchLabel: 'Search',
        searchId: 'test-id'
      }
    })
    const searchLabel = wrapper.find('label').text();

    expect(searchLabel).toEqual('Search');
  })
})
