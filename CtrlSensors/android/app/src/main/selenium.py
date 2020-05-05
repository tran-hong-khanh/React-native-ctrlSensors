from selenium.webdriver import Safari

b = Safari()
b.get('http://google.com')
e = b.find_element_by_id('lst-ib')

e.click()  # is optional, but makes sure the focus is on editbox.
e.send_keys('12.34')
e.get_attribute('value')
# outputs: u'12.34'

e.click()
e.clear()
e.get_attribute('value')
# outputs: u''

e.send_keys('56.78')
e.get_attribute('value')
# outputs: u'56.78'