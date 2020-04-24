# frozen_string_literal: true

class BulmaFormBuilder < ActionView::Helpers::FormBuilder
  def text_field(attribute, options = {})
    options[:class] = enhance_class(options)
    input_options = options.extract!(:icon_class, :label_text, :errors)
    field_wrapper(input_options) do
      super(attribute, options)
    end
  end

  private

  def enhance_class(options)
    return "#{options[:class]} input is-danger" if options[:errors].present?

    "#{options[:class]} input"
  end

  def label_for_field(text)
    return unless text

    @template.concat @template.content_tag(:label, text, class: 'label')
  end

  def icon(icon_class)
    return unless icon_class

    @template.concat(
      @template.content_tag(:span, { class: 'icon is-small is-left' }) do
        @template.content_tag(:i, nil, { class: icon_class })
      end
    )
  end

  def error_icon(errors)
    return unless errors.present?

    @template.concat(
      @template.content_tag(:span, { class: 'icon is-small is-right' }) do
        @template.content_tag(:i, nil, { class: 'fas fa-exclamation-triangle' })
      end
    )
  end

  def error_paragraphs(errors)
    return unless errors.present?

    errors.each do |error|
      @template.concat @template.content_tag(:p, error, class: 'help is-danger')
    end
  end

  def control_class(errors)
    return 'control has-icons-left' if errors.blank?

    'control has-icons-left has-icons-right'
  end

  def control_div(options, block)
    @template.content_tag(:div, { class: control_class(options[:errors]) }) do
      @template.concat block.call
      icon(options[:icon_class])
      error_icon(options[:errors])
    end
  end

  def field_wrapper(options, &block)
    @template.content_tag(:div, { class: 'field' }) do
      label_for_field(options[:label_text])
      @template.concat(control_div(options, block))
      error_paragraphs(options[:errors])
    end
  end
end
