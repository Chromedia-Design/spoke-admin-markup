var WidgetFormBuilder = function (options) {
    if (!options.form) {
        throw "WidgetFormBuilder requires the 'form' element option";
    }

    this.form = options.form;

    if (!options.formElements) {
        // build defaults
        this.formElements = {
            widget_id: this.form.find('select.enabled-widgets-choice'),
            widget_choices: this.form.find('.widget-choices'),
            widget_constraints: this.form.find('.widget-constraints')
        };
    }
    else {
        // TODO: validate
        this.formElements = options.formElements;
    }

    $('form[name=question_template_form]').submit(function() {
        $('select').removeAttr('disabled');
        return true;
    });
};

WidgetFormBuilder.prototype.initForm = function () {
    const self = this;
    const choicesList = $(this.formElements.widget_choices.get(0)).children().get();
    const constraintsList = $(this.formElements.widget_constraints.get(0)).children().get();
    const widgetConstraints = this.formElements.widget_constraints;

    // setup constraints picker
    const constraintsProto = widgetConstraints.data('prototype');
    const constraintsOptionsProto = constraintsProto.match(/ data-constraints="{[A-Za-z_,.&:;*\[\] ]*}" /)[0].split('"')[1];
    const constraintsData = constraintsProto.match(/data-constraint-options="\{.*\}"/)[0];
    const constraintsOptionObject = JSON.parse(constraintsOptionsProto.replace(/&quot;/g, '"'));
    var constraintsPicker = self.form.find('#constraints-picker');
    var constraintsOptions = '';
    $.each(constraintsOptionObject, function (i, v) {
        constraintsOptions += '<div><input class="constraints-picker-option-checkbox" type="checkbox" name=' + v + ' value=' + v + '>' + i + '<br></div>';
    });
    const constraintsBox = '<div id="constraints-picker-box" class="dropdown-content"' + constraintsData + '>' + constraintsOptions + '</div>';
    constraintsPicker.append($(constraintsBox));

    const constraintSelect = constraintsPicker.find('#constraints-picker-box');
    var constraintCategories = JSON.parse(constraintSelect.attr('data-constraint-categories'));
    var fieldTypes = JSON.parse(constraintSelect.attr('data-field-type-categories'));
    var fieldTypeCategories = {};

    constraintsPicker.find('#constraints-picker-select').on('click', function () {
        constraintsPicker.find('#constraints-picker-box').toggle();
    });

    $(document).on('click', function (e) {
        if(constraintsPicker.has($(e.target)).length === 0) {
            constraintsPicker.find('#constraints-picker-box').hide();
        }
    });

    add buttons if choice list is pre-populated
    if (choicesList.length > 0) {
        choicesList.forEach(function (e) {
            WidgetUtil.addButtons($(e));
        });
    }

    $.each(fieldTypes, function (index, value) {
        var constraintsList = [];
        $.each(value, function(i, v) {
            constraintsList = constraintsList.concat(constraintCategories[v]);
        });
        return fieldTypeCategories[index] = constraintsList;
    });

    const constraintsOptionsList = fieldTypeCategories[self.formElements.widget_id.val()];

    // handle pre-populated constraints for constraints picker
    if(constraintsList.length > 0) {
        constraintsList.forEach(function (e) {
            const selected = $(e).find('select').val();
            constraintsPicker.find('#constraints-picker-box').find('.constraints-picker-option-checkbox').each(function() {
                if ($(this).val() === selected) {
                    $(this).prop('checked', true);
                }
                if ($.inArray($(this).val(), constraintsOptionsList) === -1) {
                    $(this).parent().hide();
                }
            });
        });
    } else {
        constraintsPicker.find('#constraints-picker-box').hide();
    }

    this.formElements.widget_id.off('change').on('change', function(e) {
        e.preventDefault();
        if (WidgetUtil.isChoiceWidget($(this).val())) {
            $(self.form).on('submit', function () {
                if($(self.formElements.widget_choices).children('li').length === 0) {
                    alert("Choice should not be empty!");
                    return false;
                }
                return true
            });
            self.form.find('.add-widget-choice-trigger').show();
            self.form.find('.choices-widget-label').show();
        } else {
            self.formElements.widget_choices.removeChoices();
            self.form.find('.add-widget-choice-trigger').hide();
            self.form.find('.choices-widget-label').hide();
            $(self.form).off('submit').on('submit', function () {
                return true
            });
        }

        const optionList = fieldTypeCategories[self.formElements.widget_id.val()];
        constraintsPicker.find('#constraints-picker-box').find('.constraints-picker-option-checkbox').each(function() {
            $(this).prop('checked', false);
            if ($.inArray($(this).val(), optionList) !== -1) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        });
        constraintsPicker.find('#constraints-picker-box').hide();

        widgetConstraints.empty();
    });

    if (this.formElements.widget_id.val() === 'text' || this.formElements.widget_id.val() === null) {
        this.form.find(".add-widget-choice-trigger").hide();
        this.form.find(".choices-widget-label").hide();
    }

    this.populateWidgetChoices();
    this.populateWidgetConstraints();
};

// widget choices
WidgetFormBuilder.prototype.populateWidgetChoices = function() {
    const self = this;
    const widgetChoice = this.formElements.widget_choices;

    // add events
    const addEvents = function() {
        self.form.on('click', '.add-widget-choice-trigger', function(e) {
            var choiceInput = $(self.form).find('.choice-input');
            e.preventDefault();

            if(choiceInput.val().length === 0){
                alert("Choice should not be empty!")
            } else {
                widgetChoice.addCollectionRow();

                $(self.formElements.widget_choices).find('li:last').children().val(choiceInput.val());

                choiceInput.val(null)
            }
        });

        self.form.on('click', '.remove-widget-choice-trigger', function(e) {
            e.preventDefault();
            $(this).removeCollectionRow({ isRequired : true });
        });
    };

    // initialize widget choices
    const initWidgetChoices = function() {
        if (WidgetUtil.isChoiceWidget(self.formElements.widget_id.val())) {
            widgetChoice.displayChoices();
        } else {
            widgetChoice.find('.form-group').remove();
            widgetChoice.closest('.form-group').hide();
        }

        addEvents();
    };

    initWidgetChoices();

    return this;
};

Widget constraints
WidgetFormBuilder.prototype.populateWidgetConstraints = function() {
    const self = this;
    const widgetConstraints = this.formElements.widget_constraints;
    const constraintsPicker = widgetConstraints.parent().parent().find('#constraints-picker');
    const constraintsPickerSelect = widgetConstraints.parent().parent().find('#constraints-picker-select');
    const constraintsPickerBox = constraintsPicker.find('#constraints-picker-box');
    const constraintOptions = JSON.parse(constraintsPickerBox.attr('data-constraint-options'));

    const initWidgetConstraints = function() {
        // check if constraints are populated
        const initialConstraints = widgetConstraints.find('.constraints-li');
        if(initialConstraints.length > 0) {
            initialConstraints.each(function () {
                const constraintSelect = $(this).find('select');
                const constraintId = constraintSelect.val();
                $(this).find('select').attr('disabled', 'disabled');
                $.map($(this).find('.widget-constraint-options'), function (element) {
                    var optionsList = [];
                    var optionsIdList = [];
                    $.each($(element).find('input'), function () {
                        const idStringList = $(this).attr("id").split("_");
                        const optionId = idStringList[idStringList.length-1];
                        optionsList[optionId] = $(this).val();
                        optionsIdList.push(optionId);
                    });
                    populateConstraintOptions($(element), constraintOptions[constraintId]);
                    // add pre-populated constraints options
                    $(element).find('input').each(function () {
                        const idStringList = $(this).attr("id").split("_");
                        const optionId =  idStringList[idStringList.length-1];
                        if ($.inArray(optionId, optionsIdList) !== -1) {
                            $(this).val(optionsList[optionId]);
                            $(this).show();
                        }
                        $(this).parent().find('.constraint-option-label').addLabelSuffix();
                    });
                });
                $(this).find('select').makeTitleFromSelect();
            });
            changeConstraintSelector();
        }

        addEvents();
    };

    const populateConstraintOptions = function(constraintOptionsHolder, availableOptions) {
        constraintOptionsHolder.empty();
        const wrapper = $('<div class="columns medium-12"></div>');
        $.each(availableOptions, function(index, value) {
            const isRequired = ~value.indexOf('*');
            const trimmedValue = value.replace('*', '');
            var label = $('<div class="constraint-option-label">' + WidgetUtil.stylizeString(trimmedValue) + '</div>');
            const constraintOptionPrototype = constraintOptionsHolder.data('prototype');
            var field = $(WidgetUtil.replacePrototypeName(constraintOptionPrototype, 'proto_constraint_option', trimmedValue));
            if(isRequired) {
                field.prop('required',true);
            } else {
                field.hide();
            }
            var newOption = $(constraintOptionsHolder.attr('data-widget-tags')).html(label);
            newOption.append(field);
            newOption.appendTo(wrapper);
            label.addLabelSuffix();
        });
        wrapper.appendTo(constraintOptionsHolder);
    };

    const getOptionList = function () {
        return widgetConstraints.find('.constraints-li').find('select').map(function () {
            return $(this);
        });
    };

    const changeConstraintPicker = function () {
        var optionList = [];
        $.each(getOptionList(), function () {
            return optionList.push($(this).val());
        });

        constraintsPicker.find('.constraints-picker-option-checkbox:checked').each(function() {
            if ($.inArray($(this).val(), optionList) === -1) {
                $(this).prop('checked', false);
            }
        });
    };

    const changeConstraintSelector = function () {
        var optionList = [];
        $.each(getOptionList(), function () {
            return optionList.push($(this).children('option:selected').text());
        });

        if (optionList.length > 0) {
            constraintsPickerSelect.find('input.mb-0').val(optionList.join(', '));
        } else {
            constraintsPickerSelect.find('input.mb-0').val(null);
        }
    };

    const addEvents = function() {
        self.form.on('click', '.constraints-picker-option-checkbox', function(e) {
            const optionValue = $(this).val();

            if ($(this).is(':checked')) {
                widgetConstraints.addCollectionRow();
                widgetConstraints.find('select:last').val(optionValue);
                const options = constraintOptions[optionValue];
                const optionsHolder = widgetConstraints.find('.widget-constraint-options:last');
                widgetConstraints.find('select:last').attr('disabled', 'disabled');

                populateConstraintOptions(optionsHolder, options);
                widgetConstraints.find('select:last').makeTitleFromSelect();
            } else {
                widgetConstraints.find('select').each(function () {
                    if ($(this).val() === optionValue) {
                        $(this).parent().parent().removeCollectionRow({ isRequired : false });
                    }
                })
            }
        });

        self.form.on('click', '.remove-widget-constraint-trigger', function(e) {
            e.preventDefault();
            $(this).parent().parent().parent().removeCollectionRow({ isRequired : false });
            changeConstraintPicker();
            changeConstraintSelector();
        });

        self.form.on('click', '.constraint-option-label', function (e) {
            const option = $(this).parent().find('input')[0];
            if($(option).is(":visible") && !$(option).prop('required')) {
                $(option).val(null);
                $(option).hide();
            } else {
                $(option).show();
            }
            $(this).addLabelSuffix();
        });

        self.form.on('change', widgetConstraints, function(e) {
            e.preventDefault();
            changeConstraintSelector();
        });
    };

    initWidgetConstraints();

    return this;
};

// Reusable by different widget
$.fn.addCollectionRow = function(options) {
    const props = $.extend({
        'prototypeName' : '__name__'
    }, options);


    const getLargestIndex = function (children) {
        var i = 0;
        children.forEach(function (e) {
            var child = e.children[0];
            if (child) {
                i = Number(child.getAttribute('id').match(/[\d]+/)[0]) >= i ? Number(e.children[0].getAttribute('id').match(/[\d]+/)[0]) : i;
            }
        });
        return ++i;
    };


    const constrainPrototype = '<input type="text" id="question_template_form_widgetMetadata_choices___name__" name="question_template_form[widgetMetadata][choices][__name__]" required="required" class="form-group strong" />';
    const answerPrototype = '<div class="mb-1"><div class="row expanded bg-black20 pt-0-5 pb-0-5 border-radius-sm align-middle"><div class="columns"><p id="question_template_form_widgetMetadata_choices___name__" name="question_template_form[widgetMetadata][choices][__name__]" required="required" class="mb-0" ><strong></strong></p></div><div class="pull-right"><button class="button hollow alert clear mb-0"><i class="fa fa-trash"></i></button><button class="button hollow primary clear mb-0"><i class="fa fa-pencil"></i></button><button class="button hollow clear success small mb-0"><i class="fa fa-plus"></i> Dependant</button></div></div><div class="columns shrink"></div></div>';

    const index = $(this).data('index') ? $(this).data('index') : $(this).children().length ? getLargestIndex($(this).children().get()) : 0;

    var newForm = $(WidgetUtil.replacePrototypeName(answerPrototype, props.prototypeName, index));

    var newElem = jQuery('<li class="choices-li"></li>').html(newForm);

    this.data('index', index + 1);

    newElem.appendTo($(this));

    return this;
};

$.fn.removeCollectionRow = function(options) {
    const props = $.extend({
        'onRemoveDone' : function() {},
        'isRequired' : true
    }, options);

    if (props.isRequired && $(this).parent().siblings(':visible').length === 0) {
        alert('At least one value is required.');
    } else {
        $(this).parent().hide().html('');
    }
};

$.fn.displayChoices = function() {
    if ($(this).find('.form-group').length === 0) {
        $(this).addCollectionRow();
    }

    $(this).closest('.form-group').show();
};

$.fn.removeChoices = function() {
    $(this).empty();
    $('.form-group').remove();
};

$.fn.makeTitleFromSelect = function () {
    $(this).parent().addClass('row');
    const title = $(this).children('option:selected').text();
    const button = $('<button class="remove-widget-constraint-trigger button clear hollow alert pull-right tiny">remove</button>');
    const span = $('<span><strong>' + title + '</strong></span>');
    var wrapper = $('<div class="columns medium-12"></div>');
    wrapper.append(span, button);
    $(this).parent().append(wrapper);
    $(this).hide();
};

$.fn.addLabelSuffix = function () {
    const text = $(this).text();
    const input = $(this).parent().find('input');
    const suffix = input.prop('required') ? '*' : (input.is(':hidden') ? '+' : '-');

    if (text.indexOf('-') === -1 && text.indexOf('+') === -1 && text.indexOf('*') === -1) {
        $(this).text(text + ' ' + suffix);
    } else {
        $(this).text(text.replace(/([-+*])/, suffix));
    }
};

// Provides utility methods for widgets
const WidgetUtil = (function($) {
    return {
        choiceWidgets : ['radio', 'dropdown', 'checkbox'],

        replacePrototypeName : function(prototype, prototypeName, value) {
            const regEx = new RegExp(prototypeName, 'g');

            prototype = prototype.replace(regEx, value);

            return prototype;
        },

        addButtons : function(element) {
            const classNameType = element.attr("class").replace('s-li', '');
            const removeFormButton = $('<button type="button" ><i class="fa fa-close"></i></button>');
            element.append(removeFormButton.addClass("remove-widget-"+classNameType+"-trigger pull-right remove"));
            return element;
        },

        stylizeString : function(string) {
            const result = string.replace( /([A-Z])/g, " $1" );
            return result.charAt(0).toUpperCase() + result.slice(1);
        },

        isChoiceWidget : function(widget) {
            return $.inArray(widget, this.choiceWidgets) !== -1;
        }
    }
})(jQuery);
