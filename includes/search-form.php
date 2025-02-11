<?php
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Генерация HTML формы поиска
 */
function cas_get_search_form() {
	ob_start(); ?>
	<form class="cas-search-form" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
		<input type="hidden" name="search-type" value="custom" />

		<div class="cas-search-wrapper">
			<input
				class="cas-search-input"
				type="text"
				name="s"
				id="cas-search"
				placeholder="<?php esc_attr_e('Search...', 'custom-ajax-search'); ?>"
				autocomplete="on"
			/>

			<button type="submit" id="cas-search-submit" class="cas-search-button">
				🔍
			</button>

            <button type="submit" id="cas-search-close" class="cas-search-close-button" style="display: none;">
                ✖ (Esc)
            </button>

            <div id="cas-search-loader" class="cas-search-loader" style="display: none;">⏳</div>
		</div>

		<ul id="cas-search-results" class="cas-ajax-search"></ul>
	</form>
	<?php
	return ob_get_clean();
}
